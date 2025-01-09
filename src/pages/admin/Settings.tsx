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
                      <Tab label="Header" value="1" />
                      <Tab label="Footer" value="2" />
                    </TabList>
                  </Box>

                  <TabPanel value="1">
                    <div className="header-wrap">
                      <h1>Tab 1</h1>
                    </div>
                  </TabPanel>

                  <TabPanel value="2">
                    <div className="footer-wrap">
                      <h1>Tab 2</h1>
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
