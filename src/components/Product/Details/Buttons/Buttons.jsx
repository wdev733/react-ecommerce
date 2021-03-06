import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Counter from '../../../UI/Counter/Counter';
import Button from '../../../UI/Button/Button';
import WishlistButton from '../WishlistButton/WishlistButton';
import styles from './Buttons.module.css';
import { FormHandlersContext } from '../../../../pages/ProductPage/ProductPage';

const Buttons = props => {
  return (
    <form action="">
      <FormHandlersContext.Consumer>
        {({
          id,
          incClicked,
          decClicked,
          onChange,
          onBlur,
          onSubmit,
          count,
          onSale,
          addToWishlistClicked,
        }) => (
          <div className={styles.Buttons}>
            <Counter
              incClicked={incClicked}
              decClicked={decClicked}
              onChange={onChange}
              onBlur={onBlur}
              value={count}
              className={styles.Counter}
            />
            <Button
              theme="big"
              clicked={onSubmit}
              disabled={!onSale}
              loading={props.isAddingToCart[id]}
            >
              add to cart
            </Button>
            <WishlistButton
              clicked={addToWishlistClicked}
              saved={props.wishlist.hasOwnProperty(id)}
              loading={props.isAddingToWishlist[id]}
              className={styles.WishlistButton}
            />
          </div>
        )}
      </FormHandlersContext.Consumer>
    </form>
  );
};

Buttons.propTypes = {
  wishlist: PropTypes.object,
  isAddingToCart: PropTypes.object,
  isAddingToWishlist: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    wishlist: state.wishlist.wishlist,
    isAddingToCart: state.cart.isAddingToCart,
    isAddingToWishlist: state.wishlist.isAddingToWishlist,
  };
};

export default connect(mapStateToProps)(Buttons);
