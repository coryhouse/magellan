import PropTypes from "prop-types";

export const userPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired
});
