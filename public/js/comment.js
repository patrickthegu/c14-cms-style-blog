// Add comment
async function commentFormHandler(event) {
    event.preventDefault();
  
    const comment_content = document.querySelector('textarea[name="comment-body"]').value.trim();
  
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    
    // Only post if valid content
    if (comment_content) {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            post_id,
            comment_content
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }
  }
  
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);