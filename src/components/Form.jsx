import { useState, useEffect } from "react";
import "./Form.css";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  showPassword: false,
  search: "",
  age: "",
  phoneNumber: "",
  birthDate: "",
  department: "",
  bioDescription: "",
  country: "",
  state: "",
  priority: "",
  clientMatch: "",
  gender: "",
  interests: [],
  aboutCode: "",
  keepDataFor: "",
  rating: 0,
  fieldStatus: "",
  acceptTerms: false,
};

export default function Form() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleCheckboxGroup = (group, value) => {
    const current = formData[group];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    setFormData({ ...formData, [group]: updated });
  };

  const handleRating = (rating) => {
    setFormData({ ...formData, rating });
    if (errors.rating) {
      setErrors({ ...errors, rating: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email required";
    if (formData.password.length < 8) newErrors.password = "Minimum 8 characters";
    if (!formData.gender) newErrors.gender = "Please select a gender";
    if (!formData.country) newErrors.country = "Select a country";
    if (!formData.priority) newErrors.priority = "Select priority";
    if (formData.rating === 0) newErrors.rating = "Please rate your experience";
    if (!formData.acceptTerms) newErrors.acceptTerms = "You must accept terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      alert("Please fix the errors before submitting");
      return;
    }
    console.log("✅ FORM SUBMITTED SUCCESSFULLY!");
    console.log("Form Data:", JSON.stringify(formData, null, 2));
    alert("Form submitted successfully! Check console for data.");
  };

  const handleReset = () => {
    setFormData(initialState);
    setErrors({});
    console.log("Form reset");
  };

  const handleCancel = () => {
    handleReset();
    alert("Form cancelled");
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <div className="theme-toggle">
          <button
            type="button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>

        <h1>Modern Form Design Practice</h1>
        <p className="subtitle">
          A contemporary form showcasing enhanced text input with validation and
          accessibility features.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="section">
            <h3>Text Inputs</h3>
            <div className="grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your name"
                />
                {errors.fullName && <p className="error">{errors.fullName}</p>}
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••"
                />
                <small>Minimum 8 characters</small>
                {errors.password && <p className="error">{errors.password}</p>}
              </div>

              <div className="form-group">
                <label>Search (optional)</label>
                <div className="search-field">
                  <input
                    type="text"
                    name="search"
                    value={formData.search}
                    onChange={handleChange}
                    placeholder="Search anything..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="section">
            <h3>Numbers & Date Inputs</h3>
            <div className="grid">
              <div className="form-group">
                <label>Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="25"
                />
              </div>

              <div className="form-group">
                <label>Phone Number (optional)</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="form-group">
                <label>Birth Date *</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Department (optional)</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Sales, HR, Engineering, etc."
                />
              </div>
            </div>
          </div>

          {/* Advanced Inputs */}
          <div className="section">
            <h3>Advanced Inputs</h3>
            <div className="form-group">
              <div className="slider-header">
                <label>Volume Level</label>
                <span className="slider-value">{formData.volcanoAlert}</span>
              </div>
              <input
                type="range"
                name="volcanoAlert"
                min="0"
                max="100"
                value={formData.volcanoAlert}
                onChange={handleChange}
                className="slider"
              />
              <div className="slider-labels">
                <span>0</span>
                <span>100</span>
              </div>
              <small>Adjust your preferred volume level</small>
            </div>
          </div>

          <div className="section">
            <h3>Selects & Dropdowns</h3>
            <div className="grid">
              <div className="form-group">
                <label>Country *</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="">Select a country</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="canada">Canada</option>
                  <option value="australia">Australia</option>
                  <option value="germany">Germany</option>
                </select>
                {errors.country && <p className="error">{errors.country}</p>}
              </div>

              <div className="form-group">
                <label>State/Province (optional)</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="">Select state</option>
                  <option value="ca">California</option>
                  <option value="ny">New York</option>
                  <option value="tx">Texas</option>
                  <option value="fl">Florida</option>
                </select>
              </div>

              <div className="form-group">
                <label>Priority (Set Dynamically) *</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="">Choose priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
                <small>Sync to other server-side</small>
                {errors.priority && <p className="error">{errors.priority}</p>}
              </div>

              <div className="form-group">
                <label>Client Match (Dropdown) *</label>
                <select
                  name="clientMatch"
                  value={formData.clientMatch}
                  onChange={handleChange}
                >
                  <option value="">Choose client</option>
                  <option value="client1">Client A</option>
                  <option value="client2">Client B</option>
                  <option value="client3">Client C</option>
                </select>
              </div>
            </div>
          </div>

          {/* Choice Inputs */}
          <div className="section">
            <h3>Choice Inputs</h3>
            <div className="form-group">
              <label>Gender *</label>
              <div className="radio-group">
                {["Male", "Female", "Non-binary", "Prefer not to say"].map((item) => (
                  <label key={item} className="radio-label">
                    <input
                      type="radio"
                      name="gender"
                      value={item}
                      checked={formData.gender === item}
                      onChange={handleChange}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
              {errors.gender && <p className="error">{errors.gender}</p>}
            </div>

            <div className="form-group">
              <label>Interests (optional)</label>
              <div className="checkbox-group">
                {["Reading", "Sports", "Music", "Travel", "Cooking", "Gaming"].map((item) => (
                  <label key={item} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(item)}
                      onChange={() => handleCheckboxGroup("interests", item)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
              <small>Select all that apply</small>
            </div>
          </div>

          {/* Star Rating */}
          <div className="section">
            <h3>Rate Your Experience</h3>
            <div className="form-group">
              <label>How would you rate your experience? *</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star ${formData.rating >= star ? "filled" : ""}`}
                    onClick={() => handleRating(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
              {errors.rating && <p className="error">{errors.rating}</p>}
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="section terms-section">
            <h3>Terms & Conditions</h3>
            <div className="terms-box">
              <p>
                By submitting this form, you agree to our Terms of Service and
                Privacy Policy. We will use your information solely for the
                purposes outlined in this form. You may withdraw your consent at
                any time by contacting our support team.
              </p>
            </div>
            <label className="checkbox-label single-checkbox">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
              />
              <span>I accept the terms and conditions *</span>
            </label>
            {errors.acceptTerms && <p className="error">{errors.acceptTerms}</p>}
          </div>

          <div className="form-buttons">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!formData.acceptTerms}
            >
              Submit Form
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              Reset Form
            </button>
            <button type="button" className="btn btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
