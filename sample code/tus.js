import * as tus from "tus-js-client";

async function uploadVideo(file, signature, authExpire, guid, libraryId, title){

    let upload = new tus.Upload(file, {
        endpoint: "https://video.bunnycdn.com/tusupload",
        retryDelays: [0, 3000, 5000, 10000, 20000, 60000, 60000],
        headers: {
            AuthorizationSignature: signature,
            AuthorizationExpire: authExpire,
            VideoId: guid,
            LibraryId: libraryId,
        },
        metadata: {
            filetype: file.type,
            title: title,
        },
        onError: function(error) {
            console.log("Failed because: " + error)
        },
        onProgress: function(bytesUploaded, bytesTotal) {
            let percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
            console.log(bytesUploaded, bytesTotal, percentage + "%")
        },
        onSuccess: function() {
            console.log("Download %s from %s", upload.file.name, upload.url);
        }
    });

    function startUpload(previousUploads){

        if(previousUploads.length) upload.resumeFromPreviousUpload(previousUploads[0]);
        upload.start();
    }

    const previousUploads = await upload.findPreviousUploads();

    startUpload(previousUploads);

}

export { uploadVideo };