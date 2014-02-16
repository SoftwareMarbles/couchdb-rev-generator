/* Config */

var Bert = require('./lib/bert/bert').Bert;

exports.revIdForDoc = function(doc) {
    /* Document */
    // deleted: boolean deleted document flag
    var deleted = false;
    // oldStart: update sequence of the document
    var oldStart = 0;
    // oldRev: md5 revision of the previous document
    var oldRev = 0;
    // Body: JSON decoded contents of the document inside of the BERT tuple
    //  Bert.encode(Bert.tuple("Hello", 1));
    //  Erlang: {"Hello",1}
    var Body = Bert.tuple(JSON.stringify(doc));
    // Atts2: Attachments
    var Atts2 = [];

    // Calculated 'oldStart' based on length
    var revSequence = 1;

    var revisionInfo = [
        deleted,
        oldStart,
        oldRev,
        Body,
        Atts2
    ];

    // Encode the data into a BERT list.
    var bertDoc = Bert.binary_to_list(Bert.encode(revisionInfo));

    // Create a a new Buffer from the BERT list
    var docBuffer = new Buffer(bertDoc);

    // Create the MD5 hash from the Buffer docBuffer
    var revMd5 = require('crypto').createHash('md5').update(docBuffer).digest("hex");

    // Final revision id is the revSequence (update sequence of the document) and the calculated MD5
    var revId = revSequence + '-' + revMd5;

    console.log(revId);

    return revId;
};
