import { useState } from 'react';
import axios from 'axios';
//changed
export default function PortfolioForm() {
    const [formData, setFormData] = useState({
        full_name: '',
        username: '',
        email: '',
        bio: '',
        skills: '',
        projects: '',
        linkedin: '',
        github: '',
        template_choice: ''
    });

    const [message, setMessage] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleTemplateSelect = (templateName) => {
        setFormData(prev => ({
            ...prev,
            template_choice: templateName
        }));
        setSelectedTemplate(`http://localhost:3001/${templateName}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:8000/portfolio/', formData);
            setMessage(res.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || "Something went wrong");
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #ccc'
    };

    return (
        <div style={{ maxWidth: '900px', margin: 'auto', padding: '30px', fontFamily: 'Segoe UI' }}>
            <h2 style={{ textAlign: 'center' }}>Generate Your Professional Portfolio</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
                <input
                    type="text"
                    name="username"
                    placeholder="GitHub Username"
                    value={formData.username}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
                <textarea
                    name="bio"
                    placeholder="Short Bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    required
                />
                <input
                    type="text"
                    name="skills"
                    placeholder="Skills (comma-separated)"
                    value={formData.skills}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
                <textarea
                    name="projects"
                    placeholder="Projects (one per line or comma-separated)"
                    value={formData.projects}
                    onChange={handleChange}
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    required
                />
                <input
                    type="url"
                    name="linkedin"
                    placeholder="LinkedIn Profile URL"
                    value={formData.linkedin}
                    onChange={handleChange}
                    style={inputStyle}
                />
                <input
                    type="url"
                    name="github"
                    placeholder="GitHub Profile URL"
                    value={formData.github}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <h4>Select a Template:</h4>
                <div style={{ marginBottom: '15px' }}>
                    <button
                        type="button"
                        onClick={() => handleTemplateSelect('template1')}
                        style={{
                            padding: '10px 15px',
                            marginRight: '10px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Template 1
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTemplateSelect('template2')}
                        style={{
                            padding: '10px 15px',
                            background: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Template 2
                    </button>
                </div>

                <input type="hidden" name="template_choice" value={formData.template_choice} />

                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        background: '#333',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Generate Portfolio
                </button>
            </form>

            {selectedTemplate && (
                <div style={{ marginTop: '40px' }}>
                    <h4>Live Template Preview:</h4>
                    <iframe
                        src={selectedTemplate}
                        width="100%"
                        height="600px"
                        style={{ border: '1px solid #ccc' }}
                        title="Template Preview"
                    />
                </div>
            )}

            {message && <p style={{ marginTop: '20px', color: 'green' }}>{message}</p>}
        </div>
    );
}