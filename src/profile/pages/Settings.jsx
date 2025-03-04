import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Loader from '../../whatsapp/components/Loader';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import InputField from '../../components/layout/InputField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GeneratePasswordSettings from "../components/GeneratePasswordSettings"
import UniversalButton from '../../whatsapp/components/UniversalButton';
import outlined from '@material-tailwind/react/theme/components/timeline/timelineIconColors/outlined';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

const Settings = () => {
    // Set isLoading to false for demo purposes.
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState(0);
    const [newAPIKey, setNewAPIKey] = useState('');

    // Function to generate an API key with only lowercase letters and numbers.
    const generateAPIKey = (length = 10) => {
        const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let key = '';
        // Generate random part of full length
        for (let i = 0; i < length; i++) {
            key += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return key + "XX";
    };


    // Handler for the button click to generate a new API key.
    const handleGenerateAPIKey = () => {
        const apiKey = generateAPIKey();
        setNewAPIKey(apiKey);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleTogglePassword = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div className="w-full">
            {isLoading ? (
                <Loader />
            ) : (
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="Settings Tabs"
                        textColor="primary"
                        indicatorColor="primary"
                        variant="fullWidth"
                    >
                        <Tab
                            label={
                                <span
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                    }}
                                >
                                    <span
                                        style={{
                                            paddingRight: '0.5rem',
                                            borderRight: '1px solid #ccc',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <PasswordOutlinedIcon fontSize="small" />
                                    </span>
                                    <span>Change Password</span>
                                </span>
                            }
                            {...a11yProps(0)}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                color: 'text.secondary',
                                '&:hover': {
                                    color: 'primary.main',
                                    backgroundColor: '#f0f4ff',
                                    borderRadius: '8px',
                                },
                            }}
                        />
                        <Tab
                            label={
                                <span
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                    }}
                                >
                                    <span
                                        style={{
                                            paddingRight: '0.5rem',
                                            borderRight: '1px solid #ccc',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <KeyOutlinedIcon size={18} />
                                    </span>
                                    <span>Manage API Key</span>
                                </span>
                            }
                            {...a11yProps(1)}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                color: 'text.secondary',
                                '&:hover': {
                                    color: 'primary.main',
                                    backgroundColor: '#f0f4ff',
                                    borderRadius: '8px',
                                },
                            }}
                        />

                    </Tabs>
                    <CustomTabPanel value={value} index={0}>
                        <p>Change Password</p>
                        <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
                            <div className="relative">
                                <InputField
                                    id='oldPassword'
                                    name='oldPassword'
                                    type={showPassword ? 'text' : 'password'}
                                    label='Old Password'
                                    placeholder='Enter your old password'
                                />
                                <div
                                    onClick={handleTogglePassword}
                                    className='absolute right-1 top-11 transform -translate-y-1/2 cursor-pointer px-2'
                                >
                                    {showPassword ? <VisibilityOff fontSize='small' /> : <Visibility fontSize='small' />}
                                </div>
                            </div>
                            <GeneratePasswordSettings
                                label='New Password'
                            />
                        </div>
                        <div className="flex justify-start mt-4">
                            <UniversalButton
                                label="Update Password"
                                id="updatepassword"
                                name="updatepassword"
                                variant="primary"
                            />
                        </div>

                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <p>Manage API Key</p>
                        <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
                            <InputField
                                id='apimanagekey'
                                name='apimanagekey'
                                type="text"
                                label='Old key'
                                placeholder='Enter Old key'
                            />
                            <div className="flex gap-2 items-end">
                                <div className='flex-1 '>
                                    <InputField
                                        id="newapikey"
                                        name="newapikey"
                                        type="text"
                                        label="New API Key"
                                        placeholder="Generate New Key"
                                        value={newAPIKey}
                                        readOnly
                                        style={{ cursor: 'not-allowed', backgroundColor: '#E5E7EB' }}
                                    />
                                </div>
                                <div>
                                    <button
                                        onClick={handleGenerateAPIKey}
                                        className="bg-blue-400 hover:bg-blue-500 text-white text-sm py-2 px-2 rounded-md shadow-md focus:outline-none"
                                    >
                                        Generate Key
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-start mt-4">
                            <UniversalButton
                                label="Save"
                                id="apisaveButton"
                                name="apisaveButton"
                                variant="primary"
                            />
                        </div>
                    </CustomTabPanel>
                </Box>
            )}
        </div>
    );
};

export default Settings;

