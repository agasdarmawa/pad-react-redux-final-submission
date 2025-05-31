/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email format is wrong
 *   - should display alert when username and password are wrong
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Username"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // input password terisi, input email kosong
    cy.get('input[placeholder="Password"]').type('mypassword');
    cy.get('button[type=submit]').click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // input email terisi, input password kosong
    cy.get('input[placeholder="Email"]').type('user@example.com');
    cy.get('button[type=submit]').click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.contains('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email format is wrong', () => {
    // input password terisi dan input email terisi, tapi email tidak valid
    cy.get('input[placeholder="Email"]').type('abcdefg');
    cy.get('input[placeholder="Password"]').type('mypassword');
    cy.get('button[type=submit]').click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" must be a valid email');
    });
  });

  it('should display alert when username and password are wrong', () => {
    // isi email dan password dengan data yang salah
    cy.get('input[placeholder="Email"]').type('wrong@example.com');
    cy.get('input[placeholder="Password"]').type('wrongpassword');
    cy.get('button[type=submit]').click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.contains('email or password is wrong');
    });
  });

  it('should toggle password visibility', () => {
    // attribute default (isPasswordToggled = false)
    cy.get('input[placeholder="Password"]').should(
      'have.attr',
      'type',
      'password'
    );

    // klik tombol icon saat isPasswordToggled = false
    cy.get('[aria-label="Toggle password visibility"]').click();
    // attribute saat tombol di klik (isPasswordToggled = true)
    cy.get('input[placeholder="Password"]').should('have.attr', 'type', 'text');
    // klik tombol icon saat isPasswordToggled = true
    cy.get('[aria-label="Toggle password visibility"]').click();
    // attribute saat tombol di klik (isPasswordToggled = false)
    cy.get('input[placeholder="Password"]').should(
      'have.attr',
      'type',
      'password'
    );
  });
});
