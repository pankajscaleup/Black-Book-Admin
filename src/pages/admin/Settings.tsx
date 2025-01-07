import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from "../../components/UI/card/Card";
import classes from "../../components/edit/editCustomer/EditCustomer.module.scss";
import withRole from "../withRole";

function Settings() {
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={classes.user_acc}>
      <div className={classes.edit__container}>
        <div className={classes.edit__left}>
          <Card>
            <div className={classes.account}>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                      <Tab label="Verification" value="1" />
                      <Tab label="Personal Details" value="2" />
                      <Tab label="Unlock Media" value="3" />
                      <Tab label="Private Content" value="4" />
                    </TabList>
                  </Box>

                  <TabPanel value="1">
                    <div className="verification-wrap">
                      <h1>Tab 1</h1>
                    </div>
                  </TabPanel>

                  <TabPanel value="2">
                    <div className="verification-wrap">
                      <h1>Tab 2</h1>
                    </div>
                  </TabPanel>

                  <TabPanel value="3">
                    <div className="media-wrapper">
                      <h1>Tab 3</h1>
                    </div>
                  </TabPanel>

                  <TabPanel value="4">
                    <div className="content-wrapper">
                      <h1>Tab 4</h1>
                    </div>
                  </TabPanel>
                </TabContext>
              </Box>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default withRole(Settings, ["admin"]);
