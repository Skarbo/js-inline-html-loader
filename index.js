const fs = require( 'fs' );
const path = require( 'path' );

const htmlLoader = require( 'html-loader' );

module.exports = function ( content ) {
    const regex = /(?:import|(?:var|const|let)) (\w+) (?:from |= require\(\s?)(['"](.*?\.html)['"])(?:\s?\))?/g;
    if ( regex.test( content ) ) {
        regex.lastIndex = 0;
        let match;

        while ( ( match = regex.exec( content ) ) !== null ) {
            const htmlFile = path.resolve( path.dirname( this.resourcePath ), match[3] );
            if ( fs.existsSync( htmlFile ) ) {
                const htmlContent = fs.readFileSync( htmlFile, 'utf-8' );

                const htmlContentMinimized = htmlLoader.bind( this )( htmlContent )
                    .replace( /^.*?(".*?");?$/, '$1' );

                content = content.replace( match[0], `var ${match[1]} = ${htmlContentMinimized}` )
            }
        }
    }
    return content;
};