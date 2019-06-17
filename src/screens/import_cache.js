var cache = [];

        function importAll (r) {
          r.keys().forEach((key,index) => cache[index] = r(key));
        }    
        
        //path from json
        importAll(require.context("../images/", false, /\.(png|jpe?g|svg)$/));
export default cache;