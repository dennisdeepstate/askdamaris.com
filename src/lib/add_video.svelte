<script>
    import { validateVideoUpload } from '$lib/validateForm.js';
    import Loading from '$lib/loading.svelte';

    let title;
    let caption;
    let videos;
    let loading = false;

    function checkVideo(videos){
        if(!videos) return;
        let messages = validateVideoUpload({video: videos[0]});
        let videoValidationMessage = messages.filter(msg => msg['video'])
        if(videoValidationMessage.length > 0){
            console.log(videoValidationMessage);
        }
    }

    const submitForm = async() => {
        if(!videos) return;
        let messages = validateVideoUpload({
            title,
            caption,
            video: videos[0]
        });
        if(messages.length > 0){
            console.log(messages);
            return;
        };

        const newVideo = new FormData();
        newVideo.append(`video`, videos[0]);
        newVideo.append(`title`, title);
        newVideo.append(`caption`, caption);

        const options = {
            method: 'POST',
            body: newVideo
        };
        try{
            loading = true;
            const createVideo = await fetch(`admin/add-video`, options);
            const response = await createVideo.json();
            console.log(response);
            loading = false;
        }catch(error){
            loading = false;
            console.log(error);
        }
    }
    $:checkVideo(videos);
</script>
<style>

</style>
<Loading bind:display={loading} />
<form on:submit|preventDefault={()=>submitForm()} action="admin/add-video" method="post">
    <label for="title">Title:</label>
    <input type="text" name="title" placeholder="video title" id="name" bind:value={title}/>
    <label for="video">Video:</label>
    <input type="file" name="video" bind:files={videos}/>
    <label for="caption">Caption:</label>
    <textarea name="caption" placeholder="caption my video" bind:value={caption}></textarea>
    <input type="submit" value="start" />
</form>