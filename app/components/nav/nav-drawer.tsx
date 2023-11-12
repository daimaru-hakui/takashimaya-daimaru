"use client";
import { useDisclosure } from '@mantine/hooks';
import { Box, Drawer, Stack } from '@mantine/core';
import { GiHamburgerMenu } from "react-icons/gi";
import NavBarItem from './nav-bar-item';
import { headerLinks } from '@/utils/header-link';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { MdLogout } from "react-icons/md";

const NavDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const logout = () => {
    signOut();
  };
  return (
    <>
      <Drawer opened={opened} size="xs" position="right" onClose={close} title="MENU">
        <Stack gap={12}>
          {headerLinks.map(({ title, icon, path }, idx) => (
            <Link key={idx} href={path}>
              <NavBarItem title={title} icon={icon} />
            </Link>
          ))}
          <NavBarItem title="ログアウト"
            icon={<MdLogout />}
            onClick={logout}
          />
        </Stack>
      </Drawer>

      <GiHamburgerMenu
        onClick={open}

        style={{ cursor: "pointer" }}
      />
    </>
  );
};

export default NavDrawer;