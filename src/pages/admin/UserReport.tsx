import withRole from "../withRole";

function UserReport() {
    return (
        <h1>User Report</h1>
    );
}

export default withRole(UserReport, ["admin"]);