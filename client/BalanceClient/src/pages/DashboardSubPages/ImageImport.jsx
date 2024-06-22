import { useContext, useState } from 'react';
import './ImageImport.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ImgRecordRetrieve from '../../components/DashboardComponents/ImgRecordRetrieve';
import AuthContext from '../../context/Auth';

function ImageImport() {
  const levels = ['Novice', 'Intermediate', 'Advanced'];
  const URL_RECEIVE_IMAGES = '/dashboard/images/upload';
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [imageName, setImageName] = useState('');
  const [level, setLevel] = useState(levels[0]);
  const [description, setDescription] = useState('');
  const [submitState, setSubmitState] = useState(undefined);

  const clearFormState = () => {
    setName('');
    setImageName('');
    setLevel(levels[0]);
    setDescription('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const img_info = {
      name,
      image_name: imageName,
      level,
      description,
    };
    try {
      const response = await axiosPrivate.post(
        URL_RECEIVE_IMAGES,
        JSON.stringify({ uuid: auth?.uuid, img_info: img_info })
      );
      console.log(response, response);
      if (response.status === 200) {
        setSubmitState("Image's info upload was successful");
        clearFormState();
        return;
      }
    } catch (error) {
      console.log(error);
      console.log(error.message, error.code);
      setSubmitState("Error while uploading image's info");
      return;
    }
  };

  return (
    <div className="image-main-div">
      <div className="info-div">
        <h2>Image Submission</h2>
        <h3>Submit to inform server about an image</h3>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="mb-3">
          <label
            htmlFor="ControlImputName"
            className="form-label"
          >
            Name of the exercise
          </label>
          <input
            type="text"
            className="form-control"
            id="ControlImputName"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="ControlImputImageName"
            className="form-label"
          >
            Name of the image referencing this exercise
          </label>
          <input
            type="text"
            className="form-control"
            id="ControlImputImageName"
            placeholder="image.jpg"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="ControlImputLevel"
            className="form-label"
          >
            How hard is {name != '' ? name : '[empty field]'}
          </label>
          <select
            className="form-select"
            value={level}
            onChange={(e) => {
              setLevel(
                document.getElementById(e.target?.options?.selectedIndex).text
              );
            }}
          >
            {levels.map((l, idx) => {
              return (
                <option
                  id={idx}
                  key={idx}
                >
                  {l}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-3">
          <label
            htmlFor="ControlTextArea"
            className="form-label"
          >
            Description
          </label>
          <textarea
            className="form-control textarea"
            id="ControlTextArea"
            rows="3"
            placeholder="Change with your description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <button
          className="btn btn-primary"
          type="submit"
        >
          Submit
        </button>
        <div className="submit-state">
          <p>{submitState}</p>
        </div>
      </form>
      <div className="img-management">
        <div className="img-management-info">
          <p>Common actions to perform on image collection</p>
        </div>
        <div className="img-management-functions">
          <div className="search-component">
            <ImgRecordRetrieve />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageImport;
