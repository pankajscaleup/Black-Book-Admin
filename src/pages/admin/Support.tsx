import withRole from "../withRole";

function Support(){
    return (
        <h1>Support</h1>
    );
}

export default withRole(Support, ["admin"]);