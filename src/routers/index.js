// ** Routes Imports
import Page404 from 'pages/PageError/Page404';
import building from 'routers/router/building.route';
import campus from 'routers/router/campus.route';
import room from 'routers/router/room.route';
import floor from 'routers/router/floor.route';
import roomStatus from 'routers/router/room-status.route';
import assetType from './router/asset-type.route';
import asset from './router/asset.route';
import roomType from './router/room-type.route';
import user from './router/user.route';
import team from './router/team.route';
import virtualize from './router/virtualize.route';
import maintenance from './router/maintenance.route';
import category from './router/category.route';
import teammember from './router/team-member.route';
import model from './router/model.route';
import repairation from './router/repairation.route';
import replacement from './router/replacement.route';
import transportation from './router/transportation.route';
import roomAsset from './router/room-asset.route';
import assetcheck from './router/assetCheck.route';
import wrongAsset from './router/wrongAsset.route';
import MaintenanceShedule from './router/maintenanceShedule.route';
import needcheckAsset from './router/needCheckAsset.route';
import repairasset from './router/repair-asset.route';
import brand from './router/brand.route';
import dashboard from './router/dashboard.route';
import InventoryCheckroute from './router/InventoryCheck.route';
import InventoryCheckcf from './router/InventoryCheckConfig.route';

const otherPages = [
  {
    path: '/404',
    exact: true,
    name: 'Trang không tồn tại',
    component: Page404,
  },
];

const routes = [
  ...otherPages,
  ...building,
  ...campus,
  ...room,
  ...floor,
  ...roomStatus,
  ...assetType,
  ...asset,
  ...roomType,
  ...user,
  ...team,
  ...virtualize,
  ...maintenance,
  ...category,
  ...teammember,
  ...model,
  ...repairation,
  ...replacement,
  ...transportation,
  ...roomAsset,
  ...assetcheck,
  ...wrongAsset,
  ...MaintenanceShedule,
  ...needcheckAsset,
  ...repairasset,
  ...brand,
  ...dashboard,
  ...InventoryCheckroute,
  ...InventoryCheckcf,
];

export default routes;
