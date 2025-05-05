// import React from 'react';
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   Button,
//   Tooltip,
// } from '@mui/material';
// import ArticleIcon from '@mui/icons-material/Article';
// import TagIcon from '@mui/icons-material/Tag';
// import EmailIcon from '@mui/icons-material/Email';
// import InventoryIcon from '@mui/icons-material/Inventory';
// import { motion } from 'framer-motion';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// const MotionPaper = motion(Paper);

// const WhatsappLiveChatSettings = () => {
//   return (
//     <Box sx={{ background: 'linear-gradient(to right, #f8fbff, #ffffff)', py: 8, px: 3 }}>
//       <Box maxWidth="lg" mx="auto" textAlign="center" mb={6}>
//         <Typography variant="h4" fontWeight="bold" gutterBottom>
//           Content Creation Made Easy ✨
//         </Typography>
//         <Typography color="text.secondary">
//           Choose your task and let us do the writing magic for you.
//         </Typography>
//       </Box>

//       <Grid container spacing={4} justifyContent="center" maxWidth="lg" mx="auto">
//         {/* Card 1: Blog Post */}
//         <Grid item xs={12} sm={6}>
//           <MotionPaper
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             elevation={3}
//             sx={{
//               borderRadius: 3,
//               p: 3,
//               display: 'flex',
//               flexDirection: 'column',
//               gap: 2,
//               height: '100%',
//             }}
//           >
//             <Box display="flex" alignItems="center" gap={2}>
//               <Box sx={{ backgroundColor: '#e3f2fd', p: 1.5, borderRadius: 2 }}>
//                 <WhatsAppIcon color="primary" />
//               </Box>
//               <Typography variant="h6" fontWeight={600}>Welcome Message</Typography>
//             </Box>
//             <Typography variant="body2" color="text.secondary">
//             configure automated reply for user's first query during working hours.
//             </Typography>
//             <Box sx={{ backgroundColor: '#f5f7fa', border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}>
//               <Typography variant="caption" color="text.secondary" fontWeight={500}> Hi! </Typography>
//               <Typography variant="body2" fontWeight={600}>
//              Thanks for connecting. Someone from our team will get in touch soon.
//               </Typography>
//             </Box>
//             <Tooltip title="Click to Configure" arrow>
//               <Button variant="contained" size="small">Configure</Button>
//             </Tooltip>
//           </MotionPaper>
//         </Grid>

//         {/* Card 2: Social Media Caption */}
//         <Grid item xs={12} sm={6}>
//           <MotionPaper
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             elevation={3}
//             sx={{
//               borderRadius: 3,
//               p: 3,
//               display: 'flex',
//               flexDirection: 'column',
//               gap: 2,
//               height: '100%',
//             }}
//           >
//             <Box display="flex" alignItems="center" gap={2}>
//               <Box sx={{ backgroundColor: '#e3f2fd', p: 1.5, borderRadius: 2 }}>
//                 <TagIcon color="primary" />
//               </Box>
//               <Typography variant="h6" fontWeight={600}>Social media caption</Typography>
//             </Box>
//             <Typography variant="body2" color="text.secondary">
//               Let us prepare each caption for every social media, while you set other things.
//             </Typography>
//             <Box sx={{ backgroundColor: '#f5f7fa', border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}>
//               <Typography variant="caption" color="text.secondary" fontWeight={500}>Post your picture</Typography>
//               <Typography variant="body2" fontWeight={600}>
//                 Hey, lexi! shoot me a caption for [tell us]
//               </Typography>
//             </Box>
//             <Tooltip title="Click to begin" arrow>
//               <Button variant="contained" size="small">Try now →</Button>
//             </Tooltip>
//           </MotionPaper>
//         </Grid>

//         {/* Card 3: Email Newsletter */}
//         <Grid item xs={12} sm={6}>
//           <MotionPaper
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             elevation={3}
//             sx={{
//               borderRadius: 3,
//               p: 3,
//               display: 'flex',
//               flexDirection: 'column',
//               gap: 2,
//               height: '100%',
//             }}
//           >
//             <Box display="flex" alignItems="center" gap={2}>
//               <Box sx={{ backgroundColor: '#e3f2fd', p: 1.5, borderRadius: 2 }}>
//                 <EmailIcon color="primary" />
//               </Box>
//               <Typography variant="h6" fontWeight={600}>Email newsletter</Typography>
//             </Box>
//             <Typography variant="body2" color="text.secondary">
//               Not really have a word to send? No worries, we’ve got you covered, just let us know your needs.
//             </Typography>
//             <Box sx={{ backgroundColor: '#f5f7fa', border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}>
//               <Typography variant="caption" color="text.secondary" fontWeight={500}>New message</Typography>
//               <Typography variant="body2" fontWeight={600}>
//                 Hey, lexi! write an email to my friend, michonne about [tell us]
//               </Typography>
//             </Box>
//             <Tooltip title="Click to begin" arrow>
//               <Button variant="contained" size="small">Try now →</Button>
//             </Tooltip>
//           </MotionPaper>
//         </Grid>

//         {/* Card 4: Product Description */}
//         <Grid item xs={12} sm={6}>
//           <MotionPaper
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             elevation={3}
//             sx={{
//               borderRadius: 3,
//               p: 3,
//               display: 'flex',
//               flexDirection: 'column',
//               gap: 2,
//               height: '100%',
//             }}
//           >
//             <Box display="flex" alignItems="center" gap={2}>
//               <Box sx={{ backgroundColor: '#e3f2fd', p: 1.5, borderRadius: 2 }}>
//                 <InventoryIcon color="primary" />
//               </Box>
//               <Typography variant="h6" fontWeight={600}>Product description</Typography>
//             </Box>
//             <Typography variant="body2" color="text.secondary">
//               Got a cool product to publish? Let us know what it's about, and we’ll take care of the rest.
//             </Typography>
//             <Box sx={{ backgroundColor: '#f5f7fa', border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}>
//               <Typography variant="caption" color="text.secondary" fontWeight={500}>Publish your product</Typography>
//               <Typography variant="body2" fontWeight={600}>
//                 Write a description for [tell us]
//               </Typography>
//             </Box>
//             <Tooltip title="Click to begin" arrow>
//               <Button variant="contained" size="small">Try now →</Button>
//             </Tooltip>
//           </MotionPaper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default WhatsappLiveChatSettings;



// import React from 'react';
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   Button,
//   Tooltip,
// } from '@mui/material';
// import TagIcon from '@mui/icons-material/Tag';
// import EmailIcon from '@mui/icons-material/Email';
// import InventoryIcon from '@mui/icons-material/Inventory';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import { motion } from 'framer-motion';

// const MotionPaper = motion(Paper);

// const WhatsappLiveChatSettings = () => {
//   return (
//     <Box sx={{ background: 'linear-gradient(to bottom right, #f0f4ff, #ffffff)', py: 10, px: 4 }}>
//       {/* Heading */}
//       <Box maxWidth="lg" mx="auto" textAlign="center" mb={8}>
//         <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
//           💬 WhatsApp Live Chat Settings
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary">
//           Configure and automate your WhatsApp experience for smoother customer communication.
//         </Typography>
//       </Box>

//       <Grid container spacing={5} justifyContent="center" maxWidth="lg" mx="auto">
//         {/* Card 1: WhatsApp Welcome */}
//         <Grid item xs={12} sm={6}>
//           <MotionPaper
//             whileHover={{ scale: 1.015 }}
//             whileTap={{ scale: 0.99 }}
//             elevation={4}
//             sx={{
//               borderRadius: 4,
//               p: 4,
//               display: 'flex',
//               flexDirection: 'column',
//               gap: 2,
//               border: '1px solid #d1fae5',
//               backgroundColor: '#ecfdf5',
//               height: '100%',
//             }}
//           >
//             <Box display="flex" alignItems="center" gap={2}>
//               <Box sx={{ backgroundColor: '#25D3661A', p: 1.5, borderRadius: 2 }}>
//                 <WhatsAppIcon sx={{ color: '#25D366' }} />
//               </Box>
//               <Typography variant="h6" fontWeight={600} color="#1f2937">
//                 Welcome Message
//               </Typography>
//             </Box>
//             <Typography variant="body2" color="text.secondary">
//               Configure automated reply for user's first query during working hours.
//             </Typography>
//             <Box sx={{ backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: 2, p: 2 }}>
//               <Typography variant="caption" color="text.secondary" fontWeight={500}>
//                 Hi!
//               </Typography>
//               <Typography variant="body2" fontWeight={600}>
//                 Thanks for connecting. Someone from our team will get in touch soon.
//               </Typography>
//             </Box>
//             <Tooltip title="Click to configure" arrow>
//               <Button variant="contained" sx={{ backgroundColor: '#25D366', ':hover': { backgroundColor: '#1ebc59' } }}>
//                 Configure
//               </Button>
//             </Tooltip>
//           </MotionPaper>
//         </Grid>

//         {/* Card 2: Social Media Caption */}
//         <Grid item xs={12} sm={6}>
//           <MotionPaper
//             whileHover={{ scale: 1.015 }}
//             whileTap={{ scale: 0.99 }}
//             elevation={4}
//             sx={{
//               borderRadius: 4,
//               p: 4,
//               display: 'flex',
//               flexDirection: 'column',
//               gap: 2,
//               height: '100%',
//             }}
//           >
//             <Box display="flex" alignItems="center" gap={2}>
//               <Box sx={{ backgroundColor: '#e3f2fd', p: 1.5, borderRadius: 2 }}>
//                 <TagIcon color="primary" />
//               </Box>
//               <Typography variant="h6" fontWeight={600}>Social Media Caption</Typography>
//             </Box>
//             <Typography variant="body2" color="text.secondary">
//               Let us prepare each caption for every social media platform, while you manage the visuals.
//             </Typography>
//             <Box sx={{ backgroundColor: '#f9fafb', border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}>
//               <Typography variant="caption" color="text.secondary" fontWeight={500}>
//                 Post your picture
//               </Typography>
//               <Typography variant="body2" fontWeight={600}>
//                 Hey, lexi! shoot me a caption for [tell us]
//               </Typography>
//             </Box>
//             <Tooltip title="Click to begin" arrow>
//               <Button variant="outlined">Try now →</Button>
//             </Tooltip>
//           </MotionPaper>
//         </Grid>

//         {/* Card 3: Email Newsletter */}
//         <Grid item xs={12} sm={6}>
//           <MotionPaper
//             whileHover={{ scale: 1.015 }}
//             whileTap={{ scale: 0.99 }}
//             elevation={4}
//             sx={{
//               borderRadius: 4,
//               p: 4,
//               display: 'flex',
//               flexDirection: 'column',
//               gap: 2,
//               height: '100%',
//             }}
//           >
//             <Box display="flex" alignItems="center" gap={2}>
//               <Box sx={{ backgroundColor: '#e3f2fd', p: 1.5, borderRadius: 2 }}>
//                 <EmailIcon color="primary" />
//               </Box>
//               <Typography variant="h6" fontWeight={600}>Email Newsletter</Typography>
//             </Box>
//             <Typography variant="body2" color="text.secondary">
//               Need help writing your next email? Let us know your goal and we'll write it for you.
//             </Typography>
//             <Box sx={{ backgroundColor: '#f9fafb', border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}>
//               <Typography variant="caption" color="text.secondary" fontWeight={500}>
//                 New message
//               </Typography>
//               <Typography variant="body2" fontWeight={600}>
//                 Hey, lexi! write an email to my friend, michonne about [tell us]
//               </Typography>
//             </Box>
//             <Tooltip title="Click to begin" arrow>
//               <Button variant="outlined">Try now →</Button>
//             </Tooltip>
//           </MotionPaper>
//         </Grid>

//         {/* Card 4: Product Description */}
//         <Grid item xs={12} sm={6}>
//           <MotionPaper
//             whileHover={{ scale: 1.015 }}
//             whileTap={{ scale: 0.99 }}
//             elevation={4}
//             sx={{
//               borderRadius: 4,
//               p: 4,
//               display: 'flex',
//               flexDirection: 'column',
//               gap: 2,
//               height: '100%',
//             }}
//           >
//             <Box display="flex" alignItems="center" gap={2}>
//               <Box sx={{ backgroundColor: '#e3f2fd', p: 1.5, borderRadius: 2 }}>
//                 <InventoryIcon color="primary" />
//               </Box>
//               <Typography variant="h6" fontWeight={600}>Product Description</Typography>
//             </Box>
//             <Typography variant="body2" color="text.secondary">
//               Got a new product? Let us craft a compelling description to boost your conversions.
//             </Typography>
//             <Box sx={{ backgroundColor: '#f9fafb', border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}>
//               <Typography variant="caption" color="text.secondary" fontWeight={500}>
//                 Publish your product
//               </Typography>
//               <Typography variant="body2" fontWeight={600}>
//                 Write a description for [tell us]
//               </Typography>
//             </Box>
//             <Tooltip title="Click to begin" arrow>
//               <Button variant="outlined">Try now →</Button>
//             </Tooltip>
//           </MotionPaper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default WhatsappLiveChatSettings;


import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Tooltip,
} from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import EmailIcon from '@mui/icons-material/Email';
import InventoryIcon from '@mui/icons-material/Inventory';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { motion } from 'framer-motion';
import { Switch } from '@mui/material';


const MotionPaper = motion(Paper);

const WhatsappLiveChatSettings = () => {
  return (
    <Box sx={{ background: 'linear-gradient(to bottom right, #f0f4ff, #ffffff)', py: 5, px: 4 }}>
      {/* Heading */}
      <Box maxWidth="lg" mx="auto" textAlign="center" mb={8}>
        <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
          💬 WhatsApp Live Chat Settings
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Configure and automate your WhatsApp experience for smoother customer communication.
        </Typography>
      </Box>

      <Grid container spacing={5} justifyContent="center" maxWidth="lg">
        {/* Card 1: WhatsApp Welcome */}

        <Grid item xs={12} sm={6}>
          <MotionPaper
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            elevation={5}
            sx={{
              borderRadius: 4,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              border: '1px solid #d1fae5',
              backgroundColor: '#ecfdf5',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Header Row: Icon + Title + Toggle */}
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    backgroundColor: '#25D3661A',
                    p: 1.5,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <WhatsAppIcon sx={{ color: '#25D366', fontSize: 28 }} />
                </Box>
                <Typography variant="h6" fontWeight={700} color="#1f2937">
                  Welcome Message
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                {/* <Typography variant="caption" color="text.secondary">
          Active
        </Typography> */}
                <Switch
                  color="success"
                  defaultChecked
                  inputProps={{ 'aria-label': 'welcome-message-toggle' }}
                />
              </Box>
            </Box>

            {/* Description */}
            <Typography variant="body2" color="text.secondary">
              Automatically greet customers when they message you during working hours.
            </Typography>

            {/* Message Preview */}
            <Box
              sx={{
                backgroundColor: '#fff',
                border: '1px solid #d1d5db',
                borderRadius: 2,
                p: 2,
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
                sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
              >
                Hi!
              </Typography>
              <Typography variant="body2" fontWeight={600} color="text.primary">
                Thanks for connecting. Someone from our team will get in touch soon.
              </Typography>
            </Box>

            {/* Configure Button */}
            <Tooltip title="Click to configure" arrow>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  mt: 1,
                  alignSelf: 'flex-start',
                  backgroundColor: '#25D366',
                  fontWeight: 600,
                  textTransform: 'none',
                  px: 3,
                  ':hover': { backgroundColor: '#1ebc59' },
                }}
              >
                Configure
              </Button>
            </Tooltip>
          </MotionPaper>
        </Grid>


        <Grid item xs={12} sm={6}>
          <MotionPaper
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            elevation={5}
            sx={{
              borderRadius: 4,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              border: '1px solid #d1fae5',
              backgroundColor: '#ecfdf5',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Header Row: Icon + Title + Toggle */}
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    backgroundColor: '#25D3661A',
                    p: 1.5,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <WhatsAppIcon sx={{ color: '#25D366', fontSize: 28 }} />
                </Box>
                <Typography variant="h6" fontWeight={700} color="#1f2937">
                  Welcome Message
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                {/* <Typography variant="caption" color="text.secondary">
          Active
        </Typography> */}
                <Switch
                  color="success"
                  defaultChecked
                  inputProps={{ 'aria-label': 'welcome-message-toggle' }}
                />
              </Box>
            </Box>

            {/* Description */}
            <Typography variant="body2" color="text.secondary">
              Automatically greet customers when they message you during working hours.
            </Typography>

            {/* Message Preview */}
            <Box
              sx={{
                backgroundColor: '#fff',
                border: '1px solid #d1d5db',
                borderRadius: 2,
                p: 2,
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
                sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
              >
                Hi!
              </Typography>
              <Typography variant="body2" fontWeight={600} color="text.primary">
                Thanks for connecting. Someone from our team will get in touch soon.
              </Typography>
            </Box>

            {/* Configure Button */}
            <Tooltip title="Click to configure" arrow>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  mt: 1,
                  alignSelf: 'flex-start',
                  backgroundColor: '#25D366',
                  fontWeight: 600,
                  textTransform: 'none',
                  px: 3,
                  ':hover': { backgroundColor: '#1ebc59' },
                }}
              >
                Configure
              </Button>
            </Tooltip>
          </MotionPaper>
        </Grid>
               
        {/* Card 2: Social Media Caption */}
        <Grid item xs={12} sm={6}>
          <MotionPaper
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.99 }}
            elevation={4}
            sx={{
              borderRadius: 4,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              height: '100%',
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Box sx={{ backgroundColor: '#e3f2fd', p: 1.5, borderRadius: 2 }}>
                <EmailIcon color="primary" />
              </Box>
              <Typography variant="h6" fontWeight={600}>Email Newsletter</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Need help writing your next email? Let us know your goal and we'll write it for you.
            </Typography>
            <Box sx={{ backgroundColor: '#f9fafb', border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                New message
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                Hey, lexi! write an email to my friend, michonne about [tell us]
              </Typography>
            </Box>
            <Tooltip title="Click to begin" arrow>
              <Button variant="outlined">Try now →</Button>
            </Tooltip>
          </MotionPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WhatsappLiveChatSettings;