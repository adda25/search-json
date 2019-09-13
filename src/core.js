'use strict'

/** query = STRING */
function _search(query, data, _options) {
  var hits = new Array;
  var all_match = ";";
  data.forEach(function(v, k) {
    for (var property in v) {
      if (v.hasOwnProperty(property)) {
        if ( !v[property] ) { continue; }
        if (_options.keys.length != 0) {
          if (!_options.keys.includes(property)) { continue; }
        }
        if (query.slice(-1) == all_match) {
          var sub_querys = query.split(all_match);
          if ( sub_querys[0] == ((v[property].toString()).toLowerCase())) {
                hits.push(v);
                break;
              }
        } else {
          if (typeof v[property] == 'string') {
            if ( ((v[property].toString()).toLowerCase()).indexOf(query) !== -1 ) {
              hits.push(v);
              break;
            }
          } else if ((typeof v[property] == 'object') && _options.deep == true) {
            let resdeep = _search(query, [v[property]], _options)
            if (resdeep.length != 0) {
              hits = hits.concat(v)  
            }
          }
        }
      }
    }
  })
  return hits
}

module.exports = {
  search (query, data, options) {
    var prev_hits = new Array;
    // Default options
    let w_d = " ";
    let w_d_neg = "!";
    let w_d_or = "|";
    let _options = {}
    _options.deep = false
    _options.keys = []
    // Override options
    if (options != undefined) {
      if (options.deep != undefined) {
        _options.deep = options.deep  
      }
      if (options.keys != undefined) {
        _options.keys = options.keys  
      }
    }
    // Check not empty
    if ( (query == w_d) || (query == w_d_neg ) || (query == w_d_or) ) { return prev_hits; }
    var prev_hits = new Array;
    // Assing data
    prev_hits = data;
    // Split substrings
    query = query.toLowerCase();
    var sub_querys = query.split(w_d);
    sub_querys.forEach(function(sub_query, s_q_idx) {
      // Match special delimiters
      var sub_querys_neg = sub_query.split(w_d_neg);
      var sub_querys_or = sub_query.split(w_d_or);
      if (sub_querys_neg.length == 2) {
        // I have a negation
        // Search in the previus data.
        var neg_hits = _search(sub_querys_neg[1], prev_hits, _options);
        var diff_neg_hits = $(prev_hits).not(neg_hits).get();
        prev_hits = diff_neg_hits;
      } else if (sub_querys_or.length >= 2) {
        // I have a or
        // Search in the previus data.
        var prev_hits_cache = prev_hits; 
        var or_hits = new Array;
        for (var sq in sub_querys_or) {
          if ((sub_querys_or[sq] == "") || (sub_querys_or[sq] == " ")) { continue; }
          var or_hits_1 = _search(sub_querys_or[sq], prev_hits_cache, _options);
          if (or_hits.length == 0) {
            or_hits = or_hits_1
          } else {
            or_hits = or_hits.concat(or_hits_1);
          }
        }
        prev_hits = or_hits;
      } else {
        prev_hits = _search(sub_query, prev_hits, _options);
      }
    });
    return prev_hits;
  }
}
