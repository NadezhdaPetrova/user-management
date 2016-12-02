import { UserManagementPage } from './app.po';

describe('user-management App', function() {
  let page: UserManagementPage;

  beforeEach(() => {
    page = new UserManagementPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
