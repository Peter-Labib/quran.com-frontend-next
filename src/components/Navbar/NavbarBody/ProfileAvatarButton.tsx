import { useState } from 'react';

import Cookies from 'js-cookie';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import ArrowIcon from '../../../../public/icons/east.svg';
import LogoutIcon from '../../../../public/icons/logout.svg';
import IconPerson from '../../../../public/icons/person.svg';

import Button, { ButtonShape, ButtonVariant } from 'src/components/dls/Button/Button';
import PopoverMenu from 'src/components/dls/PopoverMenu/PopoverMenu';
import { USER_NAME_COOKIE_NAME } from 'src/utils/auth/constants';

const ProfileAvatarButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('common');
  const router = useRouter();

  const isLoggedIn = !!Cookies.get(USER_NAME_COOKIE_NAME);

  const trigger = (
    <Button
      tooltip={isLoggedIn ? null : t('login')}
      variant={ButtonVariant.Ghost}
      href={isLoggedIn ? null : '/login'}
      shape={ButtonShape.Circle}
    >
      <IconPerson />
    </Button>
  );

  const onLogoutClicked = () => {
    fetch('/api/auth/logout').then(() => {
      router.reload();
    });
  };

  const onProfileClicked = () => {
    router.push('/profile').then(() => {
      setIsOpen(false);
    });
  };
  if (isLoggedIn) {
    return (
      <PopoverMenu trigger={trigger} isOpen={isOpen} onOpenChange={setIsOpen}>
        <PopoverMenu.Item onClick={onProfileClicked} icon={<ArrowIcon />}>
          {t('profile')}
        </PopoverMenu.Item>
        <PopoverMenu.Item onClick={onLogoutClicked} icon={<LogoutIcon />}>
          {t('logout')}
        </PopoverMenu.Item>
      </PopoverMenu>
    );
  }

  return trigger;
};

export default ProfileAvatarButton;