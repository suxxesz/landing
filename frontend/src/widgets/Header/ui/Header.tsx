import ThemeSwitcher from '@/features/theme-switcher'
import LoudBar from '@/features/loud-bar'
import NotificationBell from '@/features/notification-bell'
import './Header.scss'
import HeaderNavigation from '@/features/header-navigation'
 
export default ({ isSongRequired }: { isSongRequired: boolean }) => (
    <header className="header">
        {isSongRequired && <LoudBar />}
        {!isSongRequired && <HeaderNavigation onLeftSide={true}></HeaderNavigation>}
 
        <div className="header__right">
            {isSongRequired && <HeaderNavigation onLeftSide={false}></HeaderNavigation>}
            <NotificationBell />
            <ThemeSwitcher />
        </div>
    </header>
)
 