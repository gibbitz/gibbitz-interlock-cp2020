# gibbitz-interlock-cp2020
A FoundryVTT system for Cyberpunk 2020 carrying from work done in fork https://github.com/gibbitz/cyberpunk2020-fvtt-homebrew

## Contributing
Contributions to the repository are welcome. In order to develop the system there are some peer dependencies that will need installing first:
  * _FoundryVTT_: this system was initially developed on v11.315
  * _@foundryvtt/foundryvtt-cli_: the CLI is leveraged for packaging and is also enforced as a peer dependency through NPM/Yarn
> note: the below are not currently required, but putting here for roadmap
  * _imagemagick_: [future state] imageMagick will likely be used to provide fancy image manipulation to Avatars and character art. It's inclusion is not 100% determined yet as most of what it can do can be done in node canvas at a CPU cost that I need to evaluate at that time. Regardless the choice, the module should be enforced by NPM/Yarn