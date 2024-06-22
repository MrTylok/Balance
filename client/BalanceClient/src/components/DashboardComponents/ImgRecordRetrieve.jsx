import './ImgRecordRetrieve.css';
import { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function ImgRecordRetrieve() {
  const axiosPrivate = useAxiosPrivate();
  const URL_RETRIEVE = '/dashboard/images/retrieve';

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    setErrorSubmit('');
    setResult([]);
    const payload = {};
    switch (type) {
      case 'name':
        if (name === '') {
          setErrorSubmit('Name field is required');
          return;
        }
        payload.type = 'name';
        payload.value = name;
        break;

      case 'level':
        if (level === '') {
          setErrorSubmit('Level field is required');
          return;
        }
        payload.type = 'level';
        payload.value = level;
        break;

      case 'description':
        if (description === '') {
          setErrorSubmit('Description field is required');
          return;
        }
        payload.type = 'description';
        payload.value = description;
        break;

      default:
        //error
        setErrorSubmit('Unknown field type');
        return;
    }

    if (records < 1 || records > 10) {
      setErrorSubmit('Records field must be between 1 and 10');
      return;
    } else {
      payload.records = records;
    }

    try {
      const response = await axiosPrivate.post(
        URL_RETRIEVE,
        JSON.stringify(payload)
      );

      switch (response.status) {
        case 200:
          setResult(response?.data);
          break;
        case 204:
          setResult([204]);

          break;
        case 206:
          setErrorSubmit(
            `Records expected ${response?.data?.expected} , records received ${response?.data?.actual}`
          );
          setResult(response?.data?.images);

          break;

        default:
          break;
      }
    } catch (err) {
      setErrorSubmit(err.message);
      console.log(err.data);
      return;
    }
  };

  const [formType, setFormType] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState('Novice');
  const [description, setDescription] = useState('');
  const [records, setRecords] = useState(1);
  const [errorSubmit, setErrorSubmit] = useState('');
  const [result, setResult] = useState([]);

  const defineSearch = () => {
    switch (formType) {
      case 'name':
        return (
          <div className="type-input">
            <form>
              <label
                htmlFor="name-input"
                className="form-label"
              >
                Name
              </label>
              <input
                id="name-input"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-primary "
                onClick={(e) => handleSubmit(e, formType)}
              >
                {' '}
                Submit{' '}
              </button>
              <p>{errorSubmit}</p>
            </form>
          </div>
        );

      case 'level':
        return (
          <div className="type-select">
            <form>
              <select
                className="form-select"
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
              >
                <option value={'Novice'}>Novice</option>
                <option value={'Intermediate'}>Intermediate</option>
                <option value={'Advanced'}>Advanced</option>
              </select>
              <button
                type="submit"
                className="btn btn-primary "
                onClick={(e) => handleSubmit(e, formType)}
              >
                {' '}
                Submit{' '}
              </button>
              <p>{errorSubmit}</p>
            </form>
          </div>
        );

      case 'description':
        return (
          <div className="type-input">
            <form>
              <label
                htmlFor="description-input"
                className="form-label"
              >
                Description
              </label>
              <input
                id="description-input"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-primary "
                onClick={(e) => handleSubmit(e, formType)}
              >
                {' '}
                Submit{' '}
              </button>
              <p>{errorSubmit}</p>
            </form>
          </div>
        );

      default:
        return (
          <div className="type-default">
            <p>Select any search type above</p>
          </div>
        );
    }
  };

  const displayResults = (array) => {
    if (array.length === 0) {
      return (
        <div className="search-result-empty">
          <p>Waiting for instruction</p>
        </div>
      );
    } else if (array[0] === 204) {
      return (
        <div className="search-result-empty">
          <p>No entry in Db for this input</p>
        </div>
      );
    } else {
      return (
        <div className="search-result-records">
          {array.map((el, idx) => {
            return (
              <div
                className="search-result-record"
                key={idx}
              >
                <p id="name">Name: {el.name}</p>
                <p id="image_name">Image Name: {el.image_name}</p>
                <p id="level">Level: {el.level}</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="offcanvas"
                  data-bs-target={'#offcanvas' + idx}
                  id="description"
                >
                  Description
                </button>

                <div
                  className="offcanvas offcanvas-top"
                  tabIndex="-1"
                  id={'offcanvas' + idx}
                  aria-labelledby="Desciption Offcanvas"
                >
                  <div className="offcanvas-header">
                    <h5
                      className="offcanvas-title"
                      id="offcanvasTopLabel"
                    >
                      {el.name + "'s description"}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="offcanvas-body">{el.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="external-container">
      <div className="search-div">
        <div className="search-type">
          <p>Search type</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              setErrorSubmit('');
              setFormType('name');
            }}
          >
            By Name
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setErrorSubmit('');
              setFormType('level');
            }}
          >
            By Level
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setErrorSubmit('');
              setFormType('description');
            }}
          >
            By Description
          </button>
          <div className="range-search">
            <label
              htmlFor="range-input"
              className="form-label"
            >
              Records
            </label>
            <input
              className="form-control"
              id="range-input"
              type="number"
              max="10"
              min="1"
              value={records}
              onChange={(e) => {
                setRecords(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="search-form">{defineSearch('nothing')}</div>
        <div className="search-result">{displayResults(result)}</div>
      </div>
    </div>
  );
}

export default ImgRecordRetrieve;
