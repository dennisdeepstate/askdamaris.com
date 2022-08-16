export async function get() {
    const response = await fetch('https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/268987196&width=480&height=360&color=ff0000');
    const video = await response.json();
    return {
      status: response.status,
      headers: {
        'access-control-allow-origin': '*'
      },
      body: video
    };
}