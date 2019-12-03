import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react';

export const NavBar = () => {
    return (
        <div>
            <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item header>
                        <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}}/>
                        Reactivities
                    </Menu.Item>
                    <Menu.Item name='Activities'/>
                    <Menu.Item name='friends'>
                        <Button positive content='Create Activity'/>
                    </Menu.Item>
                </Container>
            </Menu>
        </div>
    )
}
