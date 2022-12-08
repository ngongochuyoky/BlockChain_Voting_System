import Header from '~/layout/component/Header';
import Sidebar from '~/layout/component/Sidebar';
import { PropTypes } from 'prop-types';

function DefaltLayout(props) {
  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      {props.children}
    </div>
  );
}

DefaltLayout.propTypes = {
  children: PropTypes.node,
};

export default DefaltLayout;
