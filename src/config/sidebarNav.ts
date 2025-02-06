const sidebarNav = [
{
    link: "/admin/dashboard",
    section: "dashboard",
    icon: "lucide:layout-dashboard", //width:"20"
    text: "Dashboard",
    role: ["admin"],
  },
  {
    link: "/admin/users",
    section: "users",
    icon: "ph:users-bold", //width:"20"
    text: "Users",
    role: ["admin"],
  },
  {
    link: "#",
    section: "filter-options",
    icon: "ph:sliders-bold", // Main Filter Options Icon
    text: "Filter Options",
    role: ["admin"],
    submenu: [
      {
        link: "/admin/filter-options/iterestedin",
        text: "Interested In",
        icon: "mdi:account-heart", //width:"20"
      },
      {
        link: "/admin/filter-options/not-iterestedin",
        text: "Not Interested",
        icon: "mdi:account-cancel", //width:"20"
      },
      {
        link: "/admin/filter-options/education",
        text: "Education",
        icon: "mdi:school-outline", //width:"20"
      },
     /* {
        link: "/admin/filter-options/occupation",
        text: "Occupation",
        icon: "mdi:briefcase-outline", //width:"20"
      }, */
      {
        link: "/admin/filter-options/body-type",
        text: "Body Type",
        icon: "mdi:human", //width:"20"
      },
      {
        link: "/admin/filter-options/children",
        text: "Children",
        icon: "mdi:baby-carriage", //width:"20"
      },
      {
        link: "/admin/filter-options/drinking",
        text: "Drinking",
        icon: "mdi:glass-wine", //width:"20"
      },
      {
        link: "/admin/filter-options/smoking",
        text: "Smoking",
        icon: "mdi:smoking", //width:"20"
      },
      {
        link: "/admin/filter-options/ethnicity",
        text: "Ethnicity",
        icon: "mdi:earth", //width:"20"
      },
      {
        link: "/admin/filter-options/relationship-status",
        text: "Relationship Status",
        icon: "mdi:heart-outline", //width:"20"
      },
    ],
  },
  {
    link: "/admin/withdrawal",
    section: "withdrawals",
    icon: "tabler:currency-dollar", //width:"20"
    text: "Withdrawals",
    role: ["admin"],
  },
  {
    link: "/admin/transactions",
    section: "transactions",
    icon: "mdi:credit-card-outline", //width:"20"
    text: "Transactions",
    role: ["admin"],
  },
  /*{
    link: "/admin/reviews",
    section: "reviews",
    icon: "mdi:star", //width:"20"
    text: "Reviews",
    role: ["admin"],
  }, */
  {
    link: "/admin/user-report",
    section: "user-report",
    icon: "tabler:report", //width:"20"
    text: "User Reports",
    role: ["admin"],
  },
  {
    link: "/admin/pages",
    section: "pages",
    icon: "mdi:file-document-outline", //width:"20"
    text: "Pages",
    role: ["admin"],
  },
  {
    link: "/admin/faqs",
    section: "faqs",
    icon: "mdi:help-circle-outline", //width:"20"
    text: "FAQs",
    role: ["admin"],
  },
  {
    link: "/admin/testimonials",
    section: "testimonials",
    icon: "mdi:format-quote-close",  //width:"20"
    text: "Testimonials",
    role: ["admin"],
  },
  {
    link: "/admin/settings",
    section: "settings",
    icon: "mdi:cog", //width:"20"
    text: "Settings",
    role: ["admin"],
  },
];

export default sidebarNav;
