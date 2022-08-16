<script>
    import * as tus from "tus-js-client";
    let video;
    const submitVideo = async(e) => {
        e.preventDefault();
        if(typeof video === 'undefined') return;
        const formData = new FormData();
  
        formData.append(`video`, video[0]);
        const options = {
            method: 'POST',
            body: formData
        };
        try{
            const upload = await fetch(`upload.json`, options);
            const response = await upload.json();
            console.log(response);
            // let upload = new tus.Upload(video[0], {
            // endpoint: "http://localhost:1080/files/",
            // retryDelays: [0, 3000, 5000, 10000, 20000],
            // metadata: {
            //     filename: file.name,
            //     filetype: file.type
            // },
            // onError: function(error) {
            //     console.log("Failed because: " + error)
            // },
            // onProgress: function(bytesUploaded, bytesTotal) {
            //     var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
            //     console.log(bytesUploaded, bytesTotal, percentage + "%")
            // },
            // onSuccess: function() {
            //     console.log("Download %s from %s", upload.file.name, upload.url)
            // }
            // })
        }catch(error){
            console.log(error);
        }
    }
</script>

<form on:submit={(e)=>submitVideo(e)}>
    <input type="file" id="video" name="video" bind:files={video}/>
    <button type="submit">upload</button>
</form>