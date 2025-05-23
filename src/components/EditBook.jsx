import { useState } from 'react';
import { postSchema } from '../schemas/validation';

const EditBook = ({ post, saveEdit }) => {
  const [formData, setFormData] = useState({
    title: post.title,
    body: post.body,
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = postSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.format());
    } else {
      saveEdit({ ...post, ...formData });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="fade-in">
      <label>Title:</label>
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      {errors.title && <p>{errors.title._errors}</p>}

      <label>Body:</label>
      <textarea
        value={formData.body}
        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
      />
      {errors.body && <p>{errors.body._errors}</p>}

      <button type="submit">Save</button>
    </form>
  );
};
export default EditBook;
