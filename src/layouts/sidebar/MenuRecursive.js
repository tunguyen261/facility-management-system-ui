import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Wrapper = styled.ul``;

const IconRotate = styled.i`
  transform: ${(props) => (props.open ? 'rotate(90deg)' : '')};
`;

const IconItem = styled.span`
  margin-right: 16px !important;
  height: 19px;
  width: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RowMenu = styled.span`
  font-weight: ${(props) => props.open && 'bold'};
`;

function MenuRecursive({ items, openKey, setOpenKey, recureSiveOpenKey, hiddenIconOpen }) {

  const history = useHistory();

  return (
    <Wrapper>
      {items.map((item) => {
        return (
          <li key={item.name} className={`ca_has_sub ${openKey[item.key] ? 'ca_active' : ''}`}>
            <a
              onClick={() => {
                if (!item.children) {
                  history.push(item.path);
                  recureSiveOpenKey(item.key);
                } else {
                  setOpenKey({
                    ...openKey,
                    [item.key]: !openKey[item.key],
                  });
                }
              }}>
              {item?.icon && <IconItem className={item?.icon}></IconItem>}
              <RowMenu className='ca_hideen_nav' open={openKey[item.key]}>
                {item?.name}
              </RowMenu>
            </a>
            {item.children && !hiddenIconOpen && (
              <IconRotate
                onClick={() => {
                  setOpenKey({
                    ...openKey,
                    [item.key]: !openKey[item.key],
                  });
                }}
                className='fi fi-rr-angle-small-right'
                open={openKey[item.key]}
              />
            )}
            {openKey[item.key] && item.children && (
              <MenuRecursive
                hiddenIconOpen
                items={item.children}
                openKey={openKey}
                setOpenKey={setOpenKey}
                recureSiveOpenKey={recureSiveOpenKey}
              />
            )}
          </li>
        );
      })}
    </Wrapper>
  );
}

export default MenuRecursive;
