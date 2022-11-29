const AddBlog = (
  { handleAddBlog,
    title, handleTitleChange,
    author, hanleAuthorChange,
    url, handleUrlChange }
) => {
  return (<>
    <h2>create new blog</h2>
    <form onSubmit={handleAddBlog}>
      <div>
        title
        <input
          type="text"
          name="Title"
          value={title}
          onChange={handleTitleChange}></input>
      </div>

      <div>
        author
        <input
          type="text"
          name="Author"
          value={author}
          onChange={hanleAuthorChange}></input>
      </div>

      <div>
        url
        <input
          type="text"
          name="url"
          value={url}
          onChange={handleUrlChange}></input>
      </div>
      <button type='submit'>create</button>
    </form>
  </>

  )
}
export default AddBlog