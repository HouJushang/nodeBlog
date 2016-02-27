/**
 * Created by Laggo on 11/4/15.
 */
var config = {
    'SERVER_URL' : 'http://localhost:3000'
};
for(item in config){
    app.constant(item,config[item])
}
app.config(['markedProvider', function (markedProvider) {
    //$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data):/);

    //Set default options for anglar-marked
    markedProvider.setOptions({gfm: true});
    //markedProvider.setOptions({
    //    gfm: true,
    //    tables: true,
    //    highlight: function (code, lang) {
    //        if (lang) {
    //            return hljs.highlight(lang, code, true).value;
    //        } else {
    //            return hljs.highlightAuto(code).value;
    //        }
    //    }
    //});

}]);
