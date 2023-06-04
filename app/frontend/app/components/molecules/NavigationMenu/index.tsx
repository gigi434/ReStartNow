import * as React from 'react'
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'

export interface NavigationMenuProps {
  href: string
  content: string
}

export function NavigationMenu({
  navItems,
}: {
  navItems: NavigationMenuProps[]
}) {
  return (
    <nav aria-label="navigation menu">
      <List sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
        {navItems.map((item) => (
          <ListItem key={item.content} disablePadding>
            <ListItemButton
              href={item.href}
              sx={{
                display: 'block',
                whiteSpace: 'nowrap',
              }}
            >
              <ListItemText
                primary={item.content}
                primaryTypographyProps={{ color: 'textPrimary' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </nav>
  )
}
