import { useSelector } from "react-redux";

import { selectUser } from "../../redux/auth/selectors";
import { selectContacts } from "../../redux/contacts/selectors";

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const contacts = useSelector(selectContacts);
  return (
    <div>
      <p>Welcome, {user.name}</p>
      <p>You have already {contacts.length} contacts</p>
    </div>
  );
};

export default ProfilePage;
