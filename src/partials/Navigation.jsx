import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import cartStatus from '../stores/cart/selectors'
import { authState } from '../stores/auth/atom'
import useUserActions from '../hooks/useUserActions'
import '../styles.css'

const Navigation = () => {
  const { totalItems, totalPrice } = useRecoilValue(cartStatus);
  const auth = useRecoilValue(authState);
	const { logout } = useUserActions();

	return (
  	<>
  	<div>_</div>
    <div className="nav">
			<Link to="/">Hem</Link>
			{auth.token
				?	(
  				<>
    				<Link to="/profile">Profil</Link>
      			<Link to="/products">Produkter</Link>
      			<Link to="/cart">Varukorg {totalItems > 0 && totalItems}</Link>
      		</>
    			)
				:	(
  				<>
    				<Link to="/login">Logga in</Link>
            <Link to="/register">Registrera konto</Link>
          </>
  			)
			}
			{auth.token && <a onClick={logout}>Logga ut</a>}
      {auth.role === 'admin' &&
  			<Link to="/admin">Admin</Link>
      }
    </div>
    </>
)
}

export default Navigation
