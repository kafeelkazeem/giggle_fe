import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ApiUrl } from '../util/apiUrl';
import Facebook from './socialsIcons/facebook';
import Instagram from './socialsIcons/instagram';
import Twitter from './socialsIcons/twitter';
import GitHub from './socialsIcons/github';
import LinkedIn from './socialsIcons/linkedin';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Socials = () => {
  const token = localStorage.getItem('token');
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newSocialLink, setNewSocialLink] = useState('');

  // Fetch socials
  useEffect(() => {
    const fetchSocials = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${ApiUrl}/getSocials`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setSocials(response.data.technician.socialLinks); // Assuming this is an array of URLs
      } catch (error) {
        toast.error('An error occurred while fetching socials');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSocials();
  }, [token]);

  const socialPatterns = {
    facebook: /facebook\.com/,
    instagram: /instagram\.com/,
    twitter: /x\.com/,
    github: /github\.com/,
    linkedin: /linkedin\.com/,
  };

  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    github: GitHub,
    linkedin: LinkedIn,
  };

  const identifyPlatform = (url) => {
    for (const [platform, pattern] of Object.entries(socialPatterns)) {
      if (pattern.test(url)) {
        return platform;
      }
    }
    return null;
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewSocialLink('');
  };

  const handleAddSocial = async () => {
    if (!newSocialLink) {
      toast.error('Please enter a valid URL');
      return;
    }
    setActionLoading(true);
    try {
      await axios.post(
        `${ApiUrl}/addSocial`,
        { socialLink: newSocialLink },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      toast.success('Social link added successfully!');
      setSocials((prev) => [...prev, newSocialLink]);
      handleCloseDialog();
    } catch (error) {
      toast.error('An error occurred while adding the social link');
      console.log(error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveSocial = async (url) => {
    setActionLoading(true);
    try {
      await axios.delete(`${ApiUrl}/removeSocial`, {
        data: { socialLink: url },
        headers: {
          Authorization: `${token}`,
        },
      });
      toast.success('Social link removed successfully!');
      setSocials((prev) => prev.filter((link) => link !== url));
    } catch (error) {
      toast.error('An error occurred while removing the social link');
      console.log(error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex justify-center my-4">
          <CircularProgress />
        </div>
      ) : (
        <div className="flex lg:flex-row flex-col lg:items-center items-start lg:justify-center justify-start gap-4 p-1 pt-3 lg:pt-0">
          {socials.map((url, index) => {
            const platform = identifyPlatform(url);
            const IconComponent = platform ? socialIcons[platform] : null;
            if (!IconComponent) return null;

            return (
              <div key={index} className="flex flex-row items-center gap-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                >
                  <IconComponent />
                </a>
                <IconButton
                  color="secondary"
                  onClick={() => handleRemoveSocial(url)}
                  disabled={actionLoading}
                >
                  {actionLoading ? <CircularProgress size={24} /> : <DeleteIcon />}
                </IconButton>
              </div>
            );
          })}
        </div>
      )}
      <div className="w-full flex justify-end mt-4">
        <Button
          variant="outlined"
          color="primary"
          onClick={handleOpenDialog}
          disabled={actionLoading}
        >
          {actionLoading ? <CircularProgress size={24} /> : 'Add Social +'}
        </Button>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Social Link</DialogTitle>
        <DialogContent>
          <TextField
            label="Social Link URL"
            fullWidth
            value={newSocialLink}
            onChange={(e) => setNewSocialLink(e.target.value)}
            variant="outlined"
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary" disabled={actionLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleAddSocial}
            color="primary"
            variant="contained"
            disabled={actionLoading}
          >
            {actionLoading ? <CircularProgress size={24} /> : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Socials;
