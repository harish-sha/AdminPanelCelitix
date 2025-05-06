import React, { useRef, useState } from 'react';
import UniversalButton from '../../components/UniversalButton';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { TurnstileComponent } from '../../utils/TurnstileComponent';

const Blog = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
        consent: false,
    });

    const [otp, setOtp] = useState(Array(6).fill(''));
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const otpRefs = useRef([]);

    const validatePhoneNumber = (phone) => /^[0-9]{10,13}$/.test(phone);
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const sendOtp = () => {
        const phone = form.phone.trim();
        const email = form.email.trim();

        if (!validatePhoneNumber(phone)) {
            toast.error('Enter a valid phone number.');
            return;
        }

        if (!validateEmail(email)) {
            toast.error('Enter a valid email address.');
            return;
        }

        // Set verified if validations pass
        setIsOtpVerified(true); // ✅ This line added

        if (resendTimer === 0) {
            console.log('OTP sent to:', phone);
            toast.success('OTP sent successfully!');
            setIsOtpSent(true);
            setResendTimer(30);
            startResendTimer();
        }
    };

    const startResendTimer = () => {
        const interval = setInterval(() => {
            setResendTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleOtpChange = (index, value) => {
        if (/^\d?$/.test(value)) {
            const updatedOtp = [...otp];
            updatedOtp[index] = value;
            setOtp(updatedOtp);

            if (value !== '' && index < otp.length - 1) {
                otpRefs.current[index + 1].focus();
            } else if (value === '' && index > 0) {
                otpRefs.current[index - 1].focus();
            }
        }
    };

    const verifyOtp = () => {
        const enteredOtp = otp.join('');
        const validOtp = '123456';

        if (enteredOtp.length < 6) {
            toast.error('Please enter the complete 6-digit OTP.');
            return;
        }

        if (enteredOtp === validOtp) {
            toast.success('OTP Verified Successfully!');
            setIsOtpSent(false);
            setIsOtpVerified(true);
            setOtp(Array(6).fill(''));
        } else {
            toast.error('Invalid OTP. Please try again.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, phone, service } = form;

        // Validate OTP before form submission
        const enteredOtp = otp.join('');
        if (!isOtpVerified || enteredOtp.length < 6) {
            toast.error('Please verify your phone number with OTP.');
            return;
        }

        // Validate other fields
        if (!name.trim()) return toast.error('Name is required.');
        if (!email.trim() || !validateEmail(email)) return toast.error('Enter a valid email address.');
        if (!validatePhoneNumber(phone)) return toast.error('Enter a valid phone number.');
        if (!service.trim()) return toast.error('Please select a service.');

        toast.success('Form submitted successfully!');
        console.log('Form submitted:', form);
        navigate('/thank-you');
    };

    const [turnstileResponse, setTurnstileResponse] = useState(null); // To store the Turnstile response token
    // Handle Turnstile success response
    const handleTurnstileChange = (token) => {
        setTurnstileResponse(token);
        console.log("Turnstile Token:", token); // Print the Turnstile token
    };

    return (
        <div className="bg-white border border-gray-300 rounded-xl p-1 md:p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-gray-300 rounded-xl p-4 md:p-6 shadow-sm">
                <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="form-input w-full border border-gray-300 rounded-md p-2" />
                <input type="text" name="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="form-input w-full border border-gray-300 rounded-md p-2" disabled={isOtpVerified} />

                <div className="flex gap-2 items-center">
                    <input type="text" name="phone" placeholder="Phone No." disabled={isOtpVerified} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/[^\d]/g, '').slice(0, 13), isOtpVerified: false })} className="form-input w-full border border-gray-300 rounded-md p-2" />
                    <UniversalButton label="Verify" type="button" variant="brutal" disable={!validatePhoneNumber(form.phone) || resendTimer > 0} onClick={sendOtp} className="bg-[#9B44B6] border-[#9B44B6] text-white px-3 py-1 rounded hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_#9B44B6] disabled:bg-gray-300 disabled:text-gray-700 disabled:cursor-not-allowed" />
                </div>

                {isOtpSent && resendTimer > 0 && (
                    <div className="text-sm text-gray-600 mt-1">Resend in {resendTimer} seconds</div>
                )}

                {isOtpSent && (
                    <div className="flex items-center gap-2 flex-wrap mt-2">
                        {otp.map((digit, index) => (
                            <input key={index} ref={(el) => (otpRefs.current[index] = el)} type="text" maxLength={1} inputMode="numeric" value={digit} onChange={(e) => handleOtpChange(index, e.target.value)} className="w-10 h-10 text-center border border-gray-300 rounded" />
                        ))}
                        <UniversalButton label="Submit" variant="brutal" type="button" onClick={verifyOtp} className="bg-[#9B44B6] border-[#9B44B6] text-white hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_#9B44B6] px-3 py-1 rounded-md mx-1" />
                    </div>
                )}

                <input type="text" name="company" placeholder="Company Name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="form-input w-full border border-gray-300 rounded-md p-2" />

                <select name="service" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="form-select w-full border border-gray-300 rounded-md p-2 text-gray-500">
                    <option value="" disabled>Select Service</option>
                    <option value="WhatsApp Business API">WhatsApp Business API</option>
                    <option value="RCS Business Messaging">RCS Business Messaging</option>
                    <option value="SMS Solution">SMS Solution</option>
                    <option value="IVR/Missed Call">Virtual Receptionist (IVR)/Missed Call</option>
                    <option value="User Verification">Chatbot Services</option>
                    <option value="API Integration">API Integrations</option>
                    <option value="2-way SMS">2 Way SMS (Long/Shortcode)</option>
                    <option value="Missed Call Services">Missed Call Services</option>
                    <option value="Other CPaaS Solutions">Other CPaaS Solutions</option>
                </select>

                <textarea name="message" placeholder="How can we help you?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="form-textarea w-full border border-gray-300 rounded-md p-2" />

                <TurnstileComponent onChange={handleTurnstileChange} />

                <UniversalButton label="Submit" type="submit" variant="brutal" className="bg-[#9B44B6] border-[#9B44B6] text-white hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_#9B44B6] px-4 py-2 rounded-md" />
            </form>
        </div>
    );
};

export default Blog;
