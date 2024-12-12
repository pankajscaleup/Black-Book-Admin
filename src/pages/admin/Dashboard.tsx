import React from "react";
import { useTranslation } from "react-i18next";
import Summary from "../../components/summary/Summary";
import SaleChart from "../../components/chart/Chart";
import DashboardTables from "../../components/tables/DashboardTables";
import withRole from "../withRole";

function Dashboard() {
  const { t } = useTranslation();
  return (
    <section>
      <h2 className='title'>{t("dashboard")}</h2>
      <p style={{ textAlign: "center" }}>Coming Soon</p>
    </section>
  );
}

export default withRole(Dashboard, ["admin"]);
