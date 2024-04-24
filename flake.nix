{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
    ...
  }@inputs:
    flake-utils.lib.eachSystem flake-utils.lib.allSystems (system:
      let
        pkgs = import nixpkgs { inherit system; };
        inherit (pkgs) lib;

        nodejs = pkgs.nodejs_21;
      in {
        packages.default = pkgs.buildNpmPackage {
          pname = "tailwind-hyperapp-template";
          version = "0-git+${self.shortRev or "dirty"}";

          src = lib.cleanSource self;

          inherit nodejs;

          npmDepsHash = "sha256-Fdf4Z0Nio7w0qDAS6iazqr8SBzQ6R68tgOEXDb8Eax0=";
        };

        devShells.default = pkgs.mkShell {
          inherit (self.packages.${system}.default) pname version name;
          packages = [ nodejs ];
        };
      });
}
