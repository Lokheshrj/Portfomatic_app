import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Form = () => {
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        mail: '',
        location: '',
        address: '',
        education: [{ type: 'Higher Secondary', start: '', end: '', course: '', field_of_study: '', institution: '', marks: '' },
        { type: 'UG', start: '', end: '', course: '', field_of_study: '', institution: '', marks: '' },
        ],
        role: '',
        description: '',
        area_of_interest: '',
        achievements: '',
        technical_skill: '',
        soft_skill: '',
        projects: [{ title: '', description: '', git_link: '', tech_stack: '' }],
        git_link: '',
        linkedin: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleArrayChange = (e, index, key, arrayKey) => {
        const newArr = [...formData[arrayKey]];
        newArr[index][key] = e.target.value;
        setFormData({ ...formData, [arrayKey]: newArr });
    };

    const addEntry = (key, emptyObj) => {
        setFormData({ ...formData, [key]: [...formData[key], emptyObj] });
    };

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/portfolio/`, formData);
            const res = await axios.post('http://127.0.0.1:8000/portfolio/', formData);
            setMessage(res.data.message);
            alert('Form Submitted:\n' + JSON.stringify(formData, null, 2));
        } catch (error) {
            setMessage(error.response?.data?.error || "Something went wrong");
        }
    };


    const stepTitles = [
        '',
        'Personal Details',
        'Educational Details',
        'Technical Details',
        'Project Details',
        'Communication'
    ];

    return (
        <StyledWrapper>
            <div className="form-card1">
                <div className="form-card2">
                    <form className="form" onSubmit={handleSubmit}>
                        <p className="form-heading">{stepTitles[step]}</p>

                        {step === 1 && (
                            <>
                                {['name', 'phone', 'mail', 'location', 'address'].map((field) => (
                                    <div className="form-field" key={field}>
                                        <input
                                            required
                                            name={field}
                                            placeholder={field[0].toUpperCase() + field.slice(1)}
                                            className="input-field"
                                            type="text"
                                            value={formData[field]}
                                            onChange={handleChange}
                                        />
                                    </div>
                                ))}
                            </>
                        )}

                        {step === 2 && (
                            <>
                                {formData.education.map((edu, index) => (
                                    <div key={index} style={{ marginBottom: '3em' }}>
                                        <div className="form-field" style={{ marginBottom: '2em', textAlign: 'center' }}>
                                            {edu.type ? (
                                                <h3 style={{ margin: 0 }}>{edu.type}</h3> // Display as text if type exists
                                            ) : (
                                                <input
                                                    placeholder="Education Type (e.g. Higher Secondary, UG, PG)"
                                                    value={edu.type}
                                                    onChange={(e) => handleArrayChange(e, index, 'type', 'education')}
                                                    className="input-field"
                                                    style={{ width: '100%' }}
                                                />
                                            )}
                                        </div>

                                        <div className="form-field" style={{ marginBottom: '1em' }}>
                                            <input
                                                placeholder="Start Date"
                                                value={edu.start}
                                                onChange={(e) => handleArrayChange(e, index, 'start', 'education')}
                                                className="input-field"

                                            />
                                            <input
                                                placeholder="End Date"
                                                value={edu.end}
                                                onChange={(e) => handleArrayChange(e, index, 'end', 'education')}
                                                className="input-field"
                                            />
                                        </div>
                                        <div className="form-field" style={{ marginBottom: '1em' }}>
                                            <input
                                                placeholder="Course"
                                                value={edu.course}
                                                onChange={(e) => handleArrayChange(e, index, 'course', 'education')}
                                                className="input-field"
                                            />
                                            <input
                                                placeholder="Field of Study"
                                                value={edu.course}
                                                onChange={(e) => handleArrayChange(e, index, 'field_of_study', 'education')}
                                                className="input-field"
                                            />

                                        </div>
                                        <div className="form-field" style={{ marginBottom: '1em' }}>
                                            <input
                                                placeholder="Institution"
                                                value={edu.institution}
                                                onChange={(e) => handleArrayChange(e, index, 'institution', 'education')}
                                                className="input-field"
                                            />
                                            <input
                                                placeholder="Marks"
                                                value={edu.marks}
                                                onChange={(e) => handleArrayChange(e, index, 'marks', 'education')}
                                                className="input-field"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="sendMessage-btn"
                                    onClick={() =>
                                        addEntry('education', { type: '', start: '', end: '', course: '', institution: '', marks: '' })
                                    }
                                >
                                    Add Education
                                </button>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                {['role', 'description', 'area_of_interest', 'achievements', 'technical_skill', 'soft_skill'].map((field) => (
                                    <div className="form-field" key={field}>
                                        <input
                                            required
                                            name={field}
                                            placeholder={field.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                                            className="input-field"
                                            type="text"
                                            value={formData[field]}
                                            onChange={handleChange}
                                        />
                                    </div>
                                ))}
                            </>
                        )}

                        {step === 4 && (
                            <>
                                {formData.projects.map((proj, index) => (
                                    <div key={index} style={{ marginBottom: '1em' }}>
                                        <div className="form-field" style={{ marginBottom: '1em' }}>
                                            <input
                                                placeholder="Project Title"
                                                value={proj.title}
                                                onChange={(e) => handleArrayChange(e, index, 'title', 'projects')}
                                                className="input-field"
                                            />
                                        </div>
                                        <div className="form-field" style={{ marginBottom: '1em' }}>
                                            <input
                                                placeholder="Description"
                                                value={proj.description}
                                                onChange={(e) => handleArrayChange(e, index, 'description', 'projects')}
                                                className="input-field"
                                            />
                                        </div>
                                        <div className="form-field" style={{ marginBottom: '1em' }}>
                                            <input
                                                placeholder="Git Link"
                                                value={proj.git_link}
                                                onChange={(e) => handleArrayChange(e, index, 'git_link', 'projects')}
                                                className="input-field"
                                            />
                                        </div>
                                        <div className="form-field" style={{ marginBottom: '1em' }}>
                                            <input
                                                placeholder="Tech Stack"
                                                value={proj.tech_stack}
                                                onChange={(e) => handleArrayChange(e, index, 'tech_stack', 'projects')}
                                                className="input-field"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="sendMessage-btn"
                                    onClick={() =>
                                        addEntry('projects', { title: '', description: '', git_link: '', tech_stack: '' })
                                    }
                                >
                                    Add Project
                                </button>
                            </>
                        )}

                        {step === 5 && (
                            <>
                                <div className="form-field" style={{ marginBottom: '1em' }}>
                                    <input
                                        name="git_link"
                                        placeholder="GitHub Link"
                                        className="input-field"
                                        type="text"
                                        value={formData.git_link}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field" style={{ marginBottom: '1em' }}>
                                    <input
                                        name="linkedin"
                                        placeholder="LinkedIn Profile"
                                        className="input-field"
                                        type="text"
                                        value={formData.linkedin}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}

                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '1em' }}>

                            {step > 1 && (
                                <button type="button" className="sendMessage-btn" onClick={prevStep}>
                                    Back
                                </button>
                            )}
                            {step < 5 && (
                                <button type="button" className="sendMessage-btn" onClick={nextStep}>
                                    Next
                                </button>
                            )}
                            {step === 5 && (
                                <button type="button" className="sendMessage-btn" onClick={handleSubmit}>
                                    Submit
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </StyledWrapper>
    );
};



const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    align-self: center;
    font-family: inherit;
    gap: 10px;
    padding-inline: 2em;
    padding-bottom: 0.4em;
    background-color: #171717;
    //background-color: #0a192f;
    border-radius: 20px;
  }

  .form-heading {
    text-align: center;
    margin: 2em;
    color: #64ffda;
    font-size: 1.2em;
    background-color: transparent;
    align-self: center;
  }

  .form-field {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    border-radius: 10px;
    padding: 0.6em;
    border: none;
    outline: none;
    color: white;
    background-color: #171717;
    box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
  }

  .input-field {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: #ccd6f6;
    padding-inline: 1em;
  }

  .sendMessage-btn {
    cursor: pointer;
    margin-bottom: 3em;
    padding: 1em;
    border-radius: 10px;
    border: none;
    outline: none;
    background-color: transparent;
    color: #64ffda;
    font-weight: bold;
    outline: 1px solid #64ffda;
    transition: all ease-in-out 0.3s;
  }

  .sendMessage-btn:hover {
    transition: all ease-in-out 0.3s;
    background-color: #64ffda;
    color: #000;
    cursor: pointer;
    box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
  }

  .form-card1 {
    background-image: linear-gradient(163deg, #64ffda 0%, #64ffda 100%);
    border-radius: 22px;
    transition: all 0.3s;
  }

  .form-card1:hover {
    box-shadow: 0px 0px 30px 1px rgba(100, 255, 218, 0.3);
  }

  .form-card2 {
    border-radius: 0;
    transition: all 0.2s;
  }

  .form-card2:hover {
    transform: scale(0.98);
    border-radius: 20px;
  }`;

export default Form;
