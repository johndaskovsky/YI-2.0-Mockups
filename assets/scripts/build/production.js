/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

/* ========================================================================
 * Bootstrap: transition.js v3.3.5
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.5
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.5'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.5
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.5'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.5
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.5'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.5
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.5'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.5
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.5'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.5
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.5'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.5
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.5'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.5
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.5'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.5
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.5'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.5
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.5'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.5
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.5'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/*! 
 * Master Slider – Responsive Touch Swipe Slider
 * Copyright © 2015 All Rights Reserved. 
 *
 * @author Averta [www.averta.net]
 * @version 2.15.1
 * @date Jul 2015
 */


/* ================== bin-debug/js/pro/tools/base.js =================== */
window.averta = {};

;(function($){
	
	//"use strict";
	
	window.package = function(name){
		if(!window[name]) window[name] = {};
	};
	
	var extend = function(target , object){
		for(var key in object)	target[key] = object[key];
	};
	
	Function.prototype.extend = function(superclass){
		if(typeof superclass.prototype.constructor === "function"){
			extend(this.prototype , superclass.prototype);
			this.prototype.constructor = this;
		}else{
			this.prototype.extend(superclass);
			this.prototype.constructor = this;
		}	
	};
	
	// Converts JS prefix to CSS prefix
	var trans = {
		'Moz'    : '-moz-',
		'Webkit' : '-webkit-',
		'Khtml'  : '-khtml-' ,
		'O'		 : '-o-',
		'ms'	 : '-ms-',
		'Icab'   : '-icab-'
	};
	
	window._mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
	window._touch  = 'ontouchstart' in document;
	$(document).ready(function(){
		window._jcsspfx 		= getVendorPrefix();	   // JS CSS VendorPrefix
		window._csspfx 			= trans[window._jcsspfx];  // CSS VendorPrefix
		window._cssanim 		= supportsTransitions();
		window._css3d   		= supports3DTransforms();
		window._css2d   		= supportsTransforms();
	});
	
	
	// Thanks to LEA VEROU
	// http://lea.verou.me/2009/02/find-the-vendor-prefix-of-the-current-browser/
	function getVendorPrefix() {
	
		if('result' in arguments.callee) return arguments.callee.result;
	
		var regex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/;
	
		var someScript = document.getElementsByTagName('script')[0];
	
		for(var prop in someScript.style){
			if(regex.test(prop)){
				return arguments.callee.result = prop.match(regex)[0];
			}
		}
	
		if('WebkitOpacity' in someScript.style) return arguments.callee.result = 'Webkit';
		if('KhtmlOpacity' in someScript.style) return arguments.callee.result = 'Khtml';
	
		return arguments.callee.result = '';
	}
	
	
	// Thanks to Steven Benner.
	// http://stevenbenner.com/2010/03/javascript-regex-trick-parse-a-query-string-into-an-object/
	window.parseQueryString = function(url){
		var queryString = {};
		url.replace(
		    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
		    function($0, $1, $2, $3) { queryString[$1] = $3; }
		);
		
		return queryString;
	};
	
	function checkStyleValue(prop){
		 var b = document.body || document.documentElement;
	    var s = b.style;
	    var p = prop;
	    if(typeof s[p] == 'string') {return true; }
	
	    // Tests for vendor specific prop
	    v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
	    p = p.charAt(0).toUpperCase() + p.substr(1);
	    for(var i=0; i<v.length; i++) {
	      if(typeof s[v[i] + p] == 'string') { return true; }
	    }
	    return false;
	}
	
	function supportsTransitions() {
	   return checkStyleValue('transition');
	}
	
	function supportsTransforms(){
	   return checkStyleValue('transform');
	}
	
	function supports3DTransforms(){
		if(!supportsTransforms()) return false;
	    var el = document.createElement('i'),
	    has3d,
	    transforms = {
	        'WebkitTransform':'-webkit-transform',
	        'OTransform':'-o-transform',
	        'MSTransform':'-ms-transform',
	        'msTransform':'-ms-transform',
	        'MozTransform':'-moz-transform',
	        'Transform':'transform',
	        'transform':'transform'
	    };
		
		el.style.display = 'block';

	    // Add it to the body to get the computed style
	    document.body.insertBefore(el, null);
		
	    for(var t in transforms){
	        if( el.style[t] !== undefined ){
	            el.style[t] = 'translate3d(1px,1px,1px)';
	            has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
	        }
	    }
	
	    document.body.removeChild(el);
	
	    return (has3d != null && has3d.length > 0 && has3d !== "none");
	}
	
	/**
	 * Provides requestAnimationFrame in a cross browser way.
	 * @author paulirish / http://paulirish.com/
	 */
	var fps60 = 50/3;
	
	if ( !window.requestAnimationFrame ) {
	 
		window.requestAnimationFrame = ( function() {
	 
			return window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
	 
				window.setTimeout( callback, fps60 );
	 
			};
	 
		} )();
	 
	}
	
	if (!window.getComputedStyle) {
	    window.getComputedStyle = function(el, pseudo) {
	        this.el = el;
	        this.getPropertyValue = function(prop) {
	            var re = /(\-([a-z]){1})/g;
	            if (prop == 'float') prop = 'styleFloat';
	            if (re.test(prop)) {
	                prop = prop.replace(re, function () {
	                    return arguments[2].toUpperCase();
	                });
	            }
	            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
	        };
	        return el.currentStyle;
	    };
	}

	// IE8 Array indexOf fix
	if (!Array.prototype.indexOf) {
	  Array.prototype.indexOf = function(elt /*, from*/) {
	    var len = this.length >>> 0;

	    var from = Number(arguments[1]) || 0;
	    from = (from < 0)
	         ? Math.ceil(from)
	         : Math.floor(from);
	    if (from < 0)
	      from += len;

	    for (; from < len; from++)
	    {
	      if (from in this &&
	          this[from] === elt)
	        return from;
	    }
	    return -1;
	  };
	}


	/** 
	 * check ie browser
	 * @param  {Number | string}  version 
	 * @return {Boolean} 
	 */
	window.isMSIE = function ( version ) {
		if ( !$.browser.msie ) {
			return false;
		} else if ( !version ) {
			return true;
		}
		var ieVer = $.browser.version.slice(0 , $.browser.version.indexOf('.'));
		if ( typeof version === 'string' ) {
			if ( version.indexOf('<') !== -1  || version.indexOf('>') !== -1) {
				return eval( ieVer + version );
			} else {
				return eval( version + '==' + ieVer );
			}
		} else {
			return version == ieVer;
		}
	}

	$.removeDataAttrs = function($target, exclude) {
	    var i,
	        attrName,
	        dataAttrsToDelete = [],
	        dataAttrs = $target[0].attributes,
	        dataAttrsLen = dataAttrs.length;
	 	
	    exclude = exclude || [];

	    // loop through attributes and make a list of those
	    // that begin with 'data-'
	    for (i=0; i<dataAttrsLen; i++) {
	    	attrName = dataAttrs[i].name;
	        if ( 'data-' === attrName.substring(0,5) && exclude.indexOf(attrName) === -1 ) {
	            // Why don't you just delete the attributes here?
	            // Deleting an attribute changes the indices of the
	            // others wreaking havoc on the loop we are inside
	            // b/c dataAttrs is a NamedNodeMap (not an array or obj)
	            dataAttrsToDelete.push(dataAttrs[i].name);
	        }
	    }
	    // delete each of the attributes we found above
	    // i.e. those that start with "data-"
	    $.each( dataAttrsToDelete, function( index, attrName ) {
	        $target.removeAttr( attrName );
	    })
	};
	
	if(jQuery){
		$.jqLoadFix = function(){
			if(this.complete){
				var that = this;
				setTimeout(function(){$(that).load();} , 1);
			}	
		};
		
		jQuery.uaMatch = jQuery.uaMatch || function( ua ) {
			ua = ua.toLowerCase();
		
			var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
				/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
				/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
				/(msie) ([\w.]+)/.exec( ua ) ||
				ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
				[];
		
			return {
				browser: match[ 1 ] || "",
				version: match[ 2 ] || "0"
			};
		};
		
		// Don't clobber any existing jQuery.browser in case it's different
		//if ( !jQuery.browser ) {
			matched = jQuery.uaMatch( navigator.userAgent );
			browser = {};
		
			if ( matched.browser ) {
				browser[ matched.browser ] = true;
				browser.version = matched.version;
			}
		
			// Chrome is Webkit, but Webkit is also Safari.
			if ( browser.chrome ) {
				browser.webkit = true;
			} else if ( browser.webkit ) {
				browser.safari = true;
			}

			// hofix for IE11 detection 
			var isIE11 = !!navigator.userAgent.match(/Trident\/7\./);
			if (isIE11) {
				browser.msie = "true";
				delete browser.mozilla;
			}

			jQuery.browser = browser;
			
		//}
		
		$.fn.preloadImg = function(src , _event){
			this.each(function(){
				var $this = $(this);
				var self  = this;
				var img = new Image();
				img.onload = function(event){
					if(event == null) event = {}; // IE8
					$this.attr('src' , src);
					event.width = img.width;
					event.height = img.height;
					$this.data('width', img.width);
					$this.data('height', img.height);
					setTimeout(function(){_event.call(self , event);},50);
					img = null;
				};
				img.src = src;
			});
			return this;
		};
	}
})(jQuery);

/* ================== bin-debug/js/pro/tools/EventDispatcher.js =================== */
;(function(){
	
	"use strict";
	
	averta.EventDispatcher = function(){
		this.listeners = {};
	};
	
	averta.EventDispatcher.extend = function(_proto){
		var instance = new averta.EventDispatcher();
		for(var key in instance)
			if(key != 'constructor') _proto[key] =  averta.EventDispatcher.prototype[key];
	};
	
	averta.EventDispatcher.prototype = {
		
		constructor : averta.EventDispatcher,
		
		addEventListener : function(event , listener , ref){
			if(!this.listeners[event]) this.listeners[event] = [];
			this.listeners[event].push({listener:listener , ref:ref});
			
		},
		
		removeEventListener : function(event , listener , ref){
			if(this.listeners[event]){

				for(var i = 0; i < this.listeners[event].length ; ++i){
					
					if(listener === this.listeners[event][i].listener && ref === this.listeners[event][i].ref){	
						this.listeners[event].splice(i--,1);
					}
				}
				
				if (this.listeners[event].length === 0){
					this.listeners[event] = null;
				}
			}
		},
		
		dispatchEvent : function (event) {
			event.target = this;
			if(this.listeners[event.type]){
				for(var i = 0 , l = this.listeners[event.type].length; i < l ; ++i){
					this.listeners[event.type][i].listener.call(this.listeners[event.type][i].ref , event);	
				}
			}
		}
	};

})();

/* ================== bin-debug/js/pro/tools/TouchSwipe.js =================== */
;(function($){
	
	"use strict";
	
	var isTouch 	= 'ontouchstart' in document,
		isPointer 	= window.navigator.pointerEnabled,
		isMSPoiner 	= !isPointer && window.navigator.msPointerEnabled,
		usePointer  = isPointer || isMSPoiner,
	// Events	
		ev_start  = (isPointer ? 'pointerdown ' : '' ) + (isMSPoiner ? 'MSPointerDown ' : '' ) + (isTouch ? 'touchstart ' : '' ) + 'mousedown',
		ev_move   = (isPointer ? 'pointermove ' : '' ) + (isMSPoiner ? 'MSPointerMove ' : '' ) + (isTouch ? 'touchmove '  : '' ) + 'mousemove',
		ev_end    = (isPointer ? 'pointerup '   : '' ) + (isMSPoiner ? 'MSPointerUp '   : '' ) + (isTouch ? 'touchend '   : '' ) + 'mouseup', 
		ev_cancel = (isPointer ? 'pointercancel '   : '' ) + (isMSPoiner ? 'MSPointerCancel ': '' ) + 'touchcancel';
	

	averta.TouchSwipe = function($element){
		this.$element = $element;
		this.enabled = true;

		$element.bind(ev_start  , {target: this} , this.__touchStart);

		$element[0].swipe = this;
		
		this.onSwipe    = null;
		this.swipeType  = 'horizontal';
		this.noSwipeSelector = 'input, textarea, button, .no-swipe, .ms-no-swipe';

		this.lastStatus = {};
	
	};
	
	var p = averta.TouchSwipe.prototype;
	
 	/*-------------- METHODS --------------*/
	
	p.getDirection = function(new_x , new_y){
		switch(this.swipeType){
			case 'horizontal':
				return new_x <= this.start_x ? 'left' : 'right';
			break;
			case 'vertical':
				return new_y <= this.start_y ? 'up' : 'down';
			break;
			case 'all':
				if(Math.abs(new_x - this.start_x) > Math.abs(new_y - this.start_y))
					return new_x <= this.start_x ? 'left' : 'right';
				else
					return new_y <= this.start_y ? 'up' : 'down';
			break;
		}
	};
	
	p.priventDefultEvent = function(new_x , new_y){
		//if(this.priventEvt != null) return this.priventEvt;
		var dx = Math.abs(new_x - this.start_x);
		var dy = Math.abs(new_y - this.start_y);
		
		var horiz =  dx > dy;
		
		return (this.swipeType === 'horizontal' && horiz) ||
			   (this.swipeType === 'vertical' && !horiz);

		//return this.priventEvt;
	};
	
	p.createStatusObject = function(evt){
		var status_data = {} , temp_x , temp_y;
		
		temp_x = this.lastStatus.distanceX || 0;
		temp_y = this.lastStatus.distanceY || 0;
		
		status_data.distanceX = evt.pageX - this.start_x;
		status_data.distanceY = evt.pageY - this.start_y;
		status_data.moveX = status_data.distanceX - temp_x;
		status_data.moveY = status_data.distanceY - temp_y;
		
		status_data.distance  = parseInt( Math.sqrt(Math.pow(status_data.distanceX , 2) + Math.pow(status_data.distanceY , 2)) );
		
		status_data.duration  = new Date().getTime() - this.start_time;
		status_data.direction = this.getDirection(evt.pageX , evt.pageY);
		
		return status_data;
	};
	
	
	p.__reset = function(event , jqevt){
		this.reset = false;
		this.lastStatus = {};
		this.start_time = new Date().getTime();
		this.start_x = isTouch ? event.touches[0].pageX : (usePointer ? event.pageX : jqevt.pageX);
		this.start_y = isTouch ? event.touches[0].pageY : (usePointer ? event.pageY : jqevt.pageY);
	};
	
	p.__touchStart = function(event){
		
		var swipe = event.data.target;
		var jqevt = event;
		if(!swipe.enabled) return;

		if ( $(event.target).closest(swipe.noSwipeSelector, swipe.$element).length > 0 ) {
			return;
		}

		event = event.originalEvent;
		
		if( usePointer ) {
			$(this).css('-ms-touch-action', swipe.swipeType === 'horizontal' ? 'pan-y' : 'pan-x');
		}

		if(!swipe.onSwipe) {
			$.error('Swipe listener is undefined');
			return;
		}
		
		if(swipe.touchStarted) return;
		
		swipe.start_x = isTouch ? event.touches[0].pageX : (usePointer ? event.pageX : jqevt.pageX);
		swipe.start_y = isTouch ? event.touches[0].pageY : (usePointer ? event.pageY : jqevt.pageY);
		
		swipe.start_time = new Date().getTime(); 
		
		$(document).bind(ev_end    , {target: swipe} , swipe.__touchEnd).
		 		    bind(ev_move   , {target: swipe} , swipe.__touchMove).
					bind(ev_cancel , {target: swipe} , swipe.__touchCancel);

		var evt = isTouch ? event.touches[0] : (usePointer ? event : jqevt);
		var status = swipe.createStatusObject(evt);
		status.phase = 'start';
		
		swipe.onSwipe.call(null , status);
		
		if(!isTouch)
			jqevt.preventDefault();
		
		swipe.lastStatus = status;
		swipe.touchStarted = true;
	};
	
	p.__touchMove = function(event){
		var swipe = event.data.target;
		var jqevt = event;
		event = event.originalEvent;
		
		if(!swipe.touchStarted) return;
		
		clearTimeout(swipe.timo);
		swipe.timo = setTimeout(function(){swipe.__reset(event , jqevt);} , 60);
				
		var evt = isTouch ? event.touches[0] : (usePointer ? event : jqevt);

		var status = swipe.createStatusObject(evt);
		
		if(swipe.priventDefultEvent(evt.pageX , evt.pageY))
			jqevt.preventDefault();
		
		status.phase = 'move';
		
		//if(swipe.lastStatus.direction !== status.direction) swipe.__reset(event , jqevt);
		
		swipe.lastStatus = status;
		
		swipe.onSwipe.call(null , status);
	};
	
	p.__touchEnd = function(event){
		
		var swipe = event.data.target;
		var jqevt = event;
		event = event.originalEvent;
		
		clearTimeout(swipe.timo);
		
		var evt = isTouch ? event.touches[0] : (usePointer ? event : jqevt);
		
		var status = swipe.lastStatus;
		
		if(!isTouch)
			jqevt.preventDefault();
		
		status.phase = 'end';
		
		swipe.touchStarted = false;
		swipe.priventEvt   = null;
		
		$(document).unbind(ev_end     , swipe.__touchEnd).
		 		    unbind(ev_move    , swipe.__touchMove).
					unbind(ev_cancel  , swipe.__touchCancel);
		
		status.speed = status.distance / status.duration;
				
		swipe.onSwipe.call(null , status);
		
	};
	
	p.__touchCancel = function(event){
		var swipe = event.data.target;
		swipe.__touchEnd(event);
	};
	
	p.enable = function(){
		if(this.enabled) return;
		this.enabled = true;
	};
	
	p.disable = function(){
		if(!this.enabled) return;
		this.enabled = false;
	};
	
})(jQuery);

/* ================== bin-debug/js/pro/tools/Timer.js =================== */
/**
 * 	Ticker Class
 * 	Author: Averta Ltd
 */

;(function(){
	"use strict";
	
	averta.Ticker = function(){};
	
	var st = averta.Ticker,
		list = [],
		len = 0,
		__stopped = true;
	
	st.add = function (listener , ref){
		list.push([listener , ref]);
		
		if(list.length === 1) st.start();
		len = list.length;
		return len;
	};
	
	st.remove = function (listener , ref) {
		for(var i = 0 , l = list.length ; i<l ; ++i){
			if(list[i] && list[i][0] === listener && list[i][1] === ref){
				list.splice(i , 1);
			}
		}

		len = list.length;

		if( len === 0 ){
			st.stop();
		}
	};
	
	st.start = function (){
		if(!__stopped) return;
		__stopped = false;
		__tick();
	};
	
	st.stop = function (){
		__stopped = true;
	};
	
	var __tick = function () {
		if(st.__stopped) return;
		var item;
		for(var i = 0; i!==len; i++){
			item = list[i];
			item[0].call(item[1]);
		}

		requestAnimationFrame(__tick);
	};
	
})();

/**
 * 	Timer Class
 * 	Author: Averta Ltd
 */
;(function(){
	"use strict";
	
	if(!Date.now){
		Date.now = function(){
			return new Date().getTime();
		};
	}
	
	averta.Timer = function(delay , autoStart) {
		this.delay = delay;
		this.currentCount = 0;
		this.paused = false;
		this.onTimer = null;
		this.refrence = null;
		
		if(autoStart) this.start();
		
	};
	
	averta.Timer.prototype = {
		
		constructor : averta.Timer,
		
		start : function(){
			this.paused = false;
			this.lastTime = Date.now();
			averta.Ticker.add(this.update , this);
		},
		
		stop : function(){
			this.paused = true;
			averta.Ticker.remove(this.update , this);
		},
		
		reset : function(){
			this.currentCount = 0;
			this.paused = true;
			this.lastTime = Date.now();
		},
		
		update : function(){
			if(this.paused || Date.now() - this.lastTime < this.delay) return;
			this.currentCount ++;
			this.lastTime = Date.now();
			if(this.onTimer)
				this.onTimer.call(this.refrence , this.getTime());

		} ,
		
		getTime : function(){
			return this.delay * this.currentCount;
		}
		
	};
})();

/* ================== bin-debug/js/pro/tools/CSSTweener.js =================== */
;(function(){
	
	"use strict";
	
	var evt = null;
	
	window.CSSTween = function(element , duration , delay , ease){
		
		this.$element 	= element;
		this.duration 	= duration  || 1000;
		this.delay 		= delay 	|| 0;
		this.ease 		= ease 		|| 'linear';
		
		/*if(!evt){
			if(window._jcsspfx === 'O')
				evt = 'otransitionend';
			else if(window._jcsspfx == 'Webkit')
				evt = 'webkitTransitionEnd';
			else 
				evt = 'transitionend' ;
		}*/
		
	};
	
	var p = CSSTween.prototype;
	
	/*-------------- METHODS --------------*/
	
	p.to = function(callback , target){
		this.to_cb 			= callback;
		this.to_cb_target 	= target;
		
		return this;
	};

	p.from = function(callback , target ){
		this.fr_cb 			= callback;
		this.fr_cb_target 	= target;
		
		return this;
	};
	
	p.onComplete = function(callback ,target){
		this.oc_fb 			= callback;
		this.oc_fb_target 	= target;
		
		return this;
	};
	
	p.chain = function(csstween){
		this.chained_tween = csstween;
		return this;
	};
	
	p.reset = function(){
		//element.removeEventListener(evt , this.onTransComplete , true);
		clearTimeout(this.start_to);
		clearTimeout(this.end_to);
	};
	
	p.start = function(){
		var element = this.$element[0];
	
		clearTimeout(this.start_to);
		clearTimeout(this.end_to);
		
		this.fresh = true;
		
		if(this.fr_cb){
			element.style[window._jcsspfx + 'TransitionDuration'] = '0ms';
			this.fr_cb.call(this.fr_cb_target);
		}
		
		var that = this;
		
		this.onTransComplete = function(event){
			
			if(!that.fresh) return;
			
			//that.$element[0].removeEventListener(evt , this.onTransComplete, true);
			//event.stopPropagation();
			

			that.reset();
			
			element.style[window._jcsspfx + 'TransitionDuration'] = '';
			element.style[window._jcsspfx + 'TransitionProperty'] = '';
			element.style[window._jcsspfx + 'TransitionTimingFunction'] = '';
			element.style[window._jcsspfx + 'TransitionDelay'] = '';
						
			that.fresh = false;
			if(that.chained_tween) that.chained_tween.start();
			if(that.oc_fb)	that.oc_fb.call(that.oc_fb_target);
			
		};
			
		this.start_to = setTimeout(function(){
			if ( !that.$element ) return;
			element.style[window._jcsspfx + 'TransitionDuration'] = that.duration + 'ms';
			element.style[window._jcsspfx + 'TransitionProperty'] = that.transProperty || 'all';
						  
			if(that.delay > 0)	element.style[window._jcsspfx + 'TransitionDelay'] = that.delay + 'ms';
			else				element.style[window._jcsspfx + 'TransitionDelay'] = '';
					
			element.style[window._jcsspfx + 'TransitionTimingFunction'] = that.ease;

			if(that.to_cb)	that.to_cb.call(that.to_cb_target);
			
			//that.$element[0].addEventListener(evt , that.onTransComplete , true );
			
			that.end_to = setTimeout(function(){that.onTransComplete();} , that.duration + (that.delay || 0));
		} , 100);
			
		return this;
	};
		
})();

/**
 *	Cross Tween Class
 */
;(function(){
	
	"use strict";
	
	var _cssanim = null;
	window.CTween = {};
	
	function transPos(element, properties){
		if(properties.x !== undefined || properties.y !== undefined){
			if(_cssanim){
				var trans = window._jcsspfx+"Transform";
				if(properties.x !== undefined){
					properties[trans] = (properties[trans] || '') + ' translateX('+properties.x+'px)';
					delete properties.x;
				}
				
				if(properties.y !== undefined){
					properties[trans] = (properties[trans] || '') + ' translateY('+properties.y+'px)';
					delete properties.y;
				}
			}else{
				if(properties.x !== undefined){
					var posx = element.css('right') !== 'auto' ? 'right' : 'left';
					//if(!element[0].bx) element[0].bx = parseInt(element.css(posx));
					properties[posx] = /*element[0].bx + */properties.x + 'px';
					delete properties.x;
				}
				
				if(properties.y !== undefined){
					var posy = element.css('bottom') !== 'auto' ? 'bottom' : 'top';
					//if(!element[0].by) element[0].by = parseInt(element.css(posy));
					properties[posy] = /*element[0].by + */properties.y + 'px';
					delete properties.y;
				}
			}
		}
		return properties;
	}
	
	CTween.setPos = function(element , pos){
		element.css(transPos(element , pos));
	};
	
	CTween.animate = function(element , duration , properties , options){
		if(_cssanim == null) _cssanim = window._cssanim;
		
		options = options || {};
		
		transPos(element , properties);
		
		if(_cssanim){
			var tween = new CSSTween(element , duration , options.delay , EaseDic[options.ease]);
			if ( options.transProperty ) {
				tween.transProperty = options.transProperty;
			}
			tween.to(function(){ element.css(properties);});	
			if(options.complete) tween.onComplete(options.complete , options.target);
			tween.start();
			tween.stop = tween.reset;
			return tween;
		}
		
		var onCl;
		
		if(options.delay) element.delay(options.delay);
		if(options.complete) 
			onCl = function(){
				options.complete.call(options.target);
			};

		element.stop(true).animate(properties , duration , options.ease || 'linear' , onCl);
				
		return element;
	};	
	
	CTween.fadeOut = function(target , duration , remove) {
		var options = {};
		if(remove === true) {
			options.complete = function(){target.remove();};
		} else if ( remove === 2 ) {
			options.complete = function(){target.css('display', 'none');};		
		}	
		
		CTween.animate(target , duration || 1000 , {opacity : 0} , options);
	};
	
	CTween.fadeIn = function(target , duration, reset){
		if( reset !== false ) {
			target.css('opacity' , 0).css('display', '');
		}
		
		CTween.animate(target , duration || 1000 , {opacity : 1});
	};
	
})();

;(function(){
	
	// Thanks to matthewlein
	// https://github.com/matthewlein/Ceaser
	
	window.EaseDic = {
		'linear'            : 'linear',
	    'ease'              : 'ease',
	    'easeIn'            : 'ease-in',
	    'easeOut'           : 'ease-out',
	    'easeInOut'         : 'ease-in-out',
	    
	    'easeInCubic'       : 'cubic-bezier(.55,.055,.675,.19)',
	    'easeOutCubic'      : 'cubic-bezier(.215,.61,.355,1)',
	    'easeInOutCubic'    : 'cubic-bezier(.645,.045,.355,1)',
	    'easeInCirc'        : 'cubic-bezier(.6,.04,.98,.335)',
	    'easeOutCirc'       : 'cubic-bezier(.075,.82,.165,1)',
	    'easeInOutCirc'     : 'cubic-bezier(.785,.135,.15,.86)',
	    'easeInExpo'        : 'cubic-bezier(.95,.05,.795,.035)',
	    'easeOutExpo'       : 'cubic-bezier(.19,1,.22,1)',
	    'easeInOutExpo'     : 'cubic-bezier(1,0,0,1)',
	    'easeInQuad'        : 'cubic-bezier(.55,.085,.68,.53)',
	    'easeOutQuad'       : 'cubic-bezier(.25,.46,.45,.94)',
	    'easeInOutQuad'     : 'cubic-bezier(.455,.03,.515,.955)',
	    'easeInQuart'       : 'cubic-bezier(.895,.03,.685,.22)',
	    'easeOutQuart'      : 'cubic-bezier(.165,.84,.44,1)',
	    'easeInOutQuart'    : 'cubic-bezier(.77,0,.175,1)',
	    'easeInQuint'       : 'cubic-bezier(.755,.05,.855,.06)',
	    'easeOutQuint'      : 'cubic-bezier(.23,1,.32,1)',
	    'easeInOutQuint'    : 'cubic-bezier(.86,0,.07,1)',
	    'easeInSine'        : 'cubic-bezier(.47,0,.745,.715)',
	    'easeOutSine'       : 'cubic-bezier(.39,.575,.565,1)',
	    'easeInOutSine'     : 'cubic-bezier(.445,.05,.55,.95)',
	    'easeInBack'        : 'cubic-bezier(.6,-.28,.735,.045)',
	    'easeOutBack'       : 'cubic-bezier(.175, .885,.32,1.275)',
	    'easeInOutBack'     : 'cubic-bezier(.68,-.55,.265,1.55)'
	};
})();

/* ================== bin-debug/js/pro/tools/Aligner.js =================== */
;(function(){
	
	"use strict";
	
	window.MSAligner = function(type , $container , $img ){
		
		this.$container = $container;
		this.$img	    = $img;	
	
		this.type 		= type || 'stretch'; // fill , fit , stretch , tile , center
		
		this.widthOnly = false;
		this.heightOnly = false;
	};
	
	var p = MSAligner.prototype;
	
	/*-------------- METHODS --------------*/
	
	p.init = function(w , h){
		
		this.baseWidth = w;
		this.baseHeight = h;
		this.imgRatio = w / h;
		this.imgRatio2 = h / w;

		switch(this.type){
			case 'tile':
				this.$container.css('background-image' , 'url('+ this.$img.attr('src') +')');
				this.$img.remove();
			break;
			case 'center':
				this.$container.css('background-image' , 'url('+ this.$img.attr('src') +')');
				this.$container.css({
					backgroundPosition 	: 'center center',
					backgroundRepeat	: 'no-repeat'
				});
				this.$img.remove();
			break;
			case 'stretch':
				this.$img.css({
					width	: 	'100%',
					height	: 	'100%'
				});
			break;
			case 'fill':
			case 'fit' :				
				this.needAlign = true;
				this.align();
			break;
		}
		
	};
	
	p.align = function(){
		if(!this.needAlign) return;

		var cont_w = this.$container.width();
		var cont_h = this.$container.height();

		var contRatio = cont_w / cont_h;
		
		if(this.type == 'fill'){
			if(this.imgRatio < contRatio ){
				this.$img.width(cont_w);
				this.$img.height(cont_w * this.imgRatio2);				
			}else{
				this.$img.height(cont_h);
				this.$img.width(cont_h * this.imgRatio);
			}
				
		}else if(this.type == 'fit'){
			
			if(this.imgRatio < contRatio){
				this.$img.height(cont_h);
				this.$img.width(cont_h * this.imgRatio);				
			}else{
				this.$img.width(cont_w);
				this.$img.height(cont_w * this.imgRatio2);	
			}
		}
		
		this.setMargin();
		
	};

	p.setMargin = function(){

		var cont_w = this.$container.width();
		var cont_h = this.$container.height();
		
		this.$img.css('margin-top' , (cont_h - this.$img[0].offsetHeight) / 2 + 'px');
		this.$img.css('margin-left', (cont_w - this.$img[0].offsetWidth ) / 2 + 'px');
	}
	
})();

/* ================== bin-debug/js/pro/controls/controller.js =================== */
/**
 *  Touch List Control
 * 	version 1.1.2
 * 	
 * 	Copyright (C) 2014, Averta Ltd. All rights reserved. 	 	
 */

;(function(){	
	
	"use strict";
		
	var _options = {
		bouncing 			: true,
		snapping			: false,
		snapsize			: null,
		friction			: 0.05,
		outFriction			: 0.05,
		outAcceleration		: 0.09,	
		minValidDist		: 0.3,
		snappingMinSpeed	: 2,
		paging				: false,
		endless				: false,
		maxSpeed			: 160
	};
	

	var Controller = function(min , max , options){
		
		if(max === null || min === null) {
			throw new Error('Max and Min values are required.');
		}
		
		this.options = options || {};
		
		for(var key in _options){
			if(!(key in this.options))
				this.options[key] = _options[key];
		}
		
		this._max_value 	= max;
		this._min_value 	= min;
				
		this.value 			= min;
		this.end_loc 		= min;
		
		this.current_snap	= this.getSnapNum(min);
		
		this.__extrStep 	= 0;
		this.__extraMove 	= 0;
		
		this.__animID	 	= -1;
	
	};
	
	var p = Controller.prototype;
	
	/*
	---------------------------------------------------
		PUBLIC METHODS
	----------------------------------------------------
	*/


	p.changeTo = function(value , animate , speed , snap_num , dispatch) {
		this.stopped = false;
		this._internalStop();
		value = this._checkLimits(value);
		speed = Math.abs(speed || 0);
		
		if(this.options.snapping){
			snap_num = snap_num || this.getSnapNum(value);
			if( dispatch !== false )this._callsnapChange(snap_num);
			this.current_snap = snap_num;
		}
		
		if(animate){
			this.animating = true;

			var self = this,
				active_id = ++self.__animID,
				amplitude = value - self.value,
				timeStep = 0,
				targetPosition = value,
				animFrict = 1 - self.options.friction,
				timeconst = animFrict + (speed - 20)  * animFrict * 1.3 / self.options.maxSpeed;

			var tick = function(){
				
				if(active_id !== self.__animID) return;
				
				var dis =  value - self.value;
				
				if( Math.abs(dis) > self.options.minValidDist && self.animating ){
					window.requestAnimationFrame(tick);
				} else {

					if( self.animating ){
						self.value = value;
						self._callrenderer();
					}

					self.animating = false;
					
					if( active_id !== self.__animID ){
						self.__animID = -1;
					}
					
					self._callonComplete('anim');
					
					return;
				}

				//self.value += dis * timeconst
				self.value = targetPosition - amplitude * Math.exp(-++timeStep * timeconst);

				self._callrenderer();
			};
		
			tick();
			
			return;
		}
				
		this.value = value;
		this._callrenderer();
	};
	
	p.drag = function(move){
		
		if(this.start_drag){
			this.drag_start_loc  = this.value;
			this.start_drag = false;
		}
		
		this.animating 		= false;
		this._deceleration 	= false;
		
		this.value -= move;
				
		if ( !this.options.endless && (this.value > this._max_value || this.value < 0)) {
			if (this.options.bouncing) {
				this.__isout = true;
				this.value += move * 0.6;
			} else if (this.value > this._max_value) {
				this.value = this._max_value;
			} else {
				this.value = 0;
			}
		}else if(!this.options.endless && this.options.bouncing){
				this.__isout = false;
		}
		
		this._callrenderer();
		
	};
	
	p.push = function(speed){
		this.stopped = false;
		if(this.options.snapping && Math.abs(speed) <= this.options.snappingMinSpeed){
			this.cancel();
			return;
		}
		
		this.__speed = speed;
		this.__startSpeed = speed;

		this.end_loc = this._calculateEnd();
		
		if(this.options.snapping){
			
			var snap_loc = this.getSnapNum(this.value),
				end_snap = this.getSnapNum(this.end_loc);

			if(this.options.paging){
				snap_loc = this.getSnapNum(this.drag_start_loc);
				
				this.__isout = false;
				if(speed > 0){
					this.gotoSnap(snap_loc + 1 , true , speed);
				}else{
					this.gotoSnap(snap_loc - 1 , true , speed);
				}
				return;	
			}else if(snap_loc === end_snap){
				this.cancel();
				return;
			}
			
			this._callsnapChange(end_snap);
			this.current_snap = end_snap;
			
		}
		
		this.animating = false;

		this.__needsSnap = this.options.endless || (this.end_loc > this._min_value && this.end_loc < this._max_value) ;
	
		if(this.options.snapping && this.__needsSnap)
			this.__extraMove = this._calculateExtraMove(this.end_loc);
		
		
		this._startDecelaration();
	};
	
	p.bounce = function(speed){
		if(this.animating) return;
		this.stopped = false;
		this.animating = false;
		
		this.__speed = speed;
		this.__startSpeed = speed;
		
		this.end_loc = this._calculateEnd();
		
		//if(this.options.paging){}
		
		this._startDecelaration();
	};
	
	p.stop = function(){
		this.stopped = true;
		this._internalStop();
	};
		
	p.cancel = function(){
		this.start_drag = true; // reset flag for next drag
		if(this.__isout){
			this.__speed = 0.0004;
			this._startDecelaration();
		}else if(this.options.snapping){
			this.gotoSnap(this.getSnapNum(this.value) , true);
		}
		
	};
		
	p.renderCallback = function(listener , ref){
		this.__renderHook = {fun:listener , ref:ref};
	};
	
	p.snappingCallback = function(listener , ref){
		this.__snapHook = {fun:listener , ref:ref};
	};
	
	p.snapCompleteCallback = function(listener , ref){
		this.__compHook = {fun:listener , ref:ref};
	};
	
	p.getSnapNum = function(value){
		return Math.floor(( value + this.options.snapsize / 2 ) / this.options.snapsize);
	};
		
	p.nextSnap = function(){
		this._internalStop();
		
		var curr_snap = this.getSnapNum(this.value);
		
		if(!this.options.endless && (curr_snap + 1) * this.options.snapsize > this._max_value){
			this.__speed = 8;
			this.__needsSnap = false;
			this._startDecelaration();
		}else{
			this.gotoSnap(curr_snap + 1 , true);
		}
	
	};
	
	p.prevSnap = function(){
		this._internalStop();
		
		var curr_snap = this.getSnapNum(this.value);
				
		if(!this.options.endless && (curr_snap - 1) * this.options.snapsize < this._min_value){
			this.__speed = -8;
			this.__needsSnap = false;
			this._startDecelaration();
		}else{
			this.gotoSnap(curr_snap - 1 , true);
		}
	
	};
	
	p.gotoSnap = function(snap_num , animate , speed){
		this.changeTo(snap_num * this.options.snapsize , animate , speed , snap_num);
	};
	
	p.destroy = function(){
		this._internalStop();
		this.__renderHook = null;
		this.__snapHook = null;
		this.__compHook = null;
	};
	
	/*
	---------------------------------------------------
		PRIVATE METHODS
	----------------------------------------------------
	*/
	
	p._internalStop = function(){
		this.start_drag = true; // reset flag for next drag
		this.animating = false;
		this._deceleration = false;
		this.__extrStep = 0;
	};
	
	p._calculateExtraMove = function(value){
		var m = value % this.options.snapsize;
		return m < this.options.snapsize / 2  ? -m : this.options.snapsize - m;
	};
	
	p._calculateEnd = function(step){
		var temp_speed = this.__speed;
		var temp_value = this.value;
		var i = 0;
		while(Math.abs(temp_speed) > this.options.minValidDist){
			temp_value += temp_speed;
			temp_speed *= this.options.friction;
			i++;
		}
		if(step) return i;
		return temp_value;
	};
	
	p._checkLimits = function(value){
		if(this.options.endless) 	return value;
		if(value < this._min_value) return this._min_value;
		if(value > this._max_value) return this._max_value;
		return value;
	};
	
	p._callrenderer = function(){
		if(this.__renderHook) this.__renderHook.fun.call(this.__renderHook.ref , this , this.value);
	};
	
	p._callsnapChange = function(targetSnap){
		if(!this.__snapHook || targetSnap === this.current_snap) return;
		this.__snapHook.fun.call(this.__snapHook.ref , this , targetSnap , targetSnap - this.current_snap);
	};

	p._callonComplete = function(type){
		if(this.__compHook && !this.stopped){
			this.__compHook.fun.call(this.__compHook.ref , this , this.current_snap , type);
		}
			
	};

	p._computeDeceleration = function(){
		
		if(this.options.snapping && this.__needsSnap){
			var xtr_move = (this.__startSpeed - this.__speed) / this.__startSpeed * this.__extraMove;
			this.value += this.__speed + xtr_move - this.__extrStep;
			this.__extrStep = xtr_move;
		}else{
			this.value += this.__speed;
		}
		
		this.__speed *= this.options.friction; //* 10;
		
		if(!this.options.endless && !this.options.bouncing){
			if(this.value <= this._min_value){
				this.value = this._min_value;
				this.__speed = 0;
			}else if(this.value >= this._max_value){
				this.value = this._max_value;
				this.__speed = 0;
			}
		}
		
		this._callrenderer();
		
		if(!this.options.endless && this.options.bouncing){
			
			var out_value = 0;
			
			if(this.value < this._min_value){
				out_value = this._min_value - this.value;
			}else if(this.value > this._max_value){
				out_value = this._max_value - this.value;
			}
			
			this.__isout =  Math.abs(out_value) >= this.options.minValidDist;
			
			if(this.__isout){
				if(this.__speed * out_value <= 0){
					this.__speed += out_value * this.options.outFriction;
				}else {
					this.__speed = out_value * this.options.outAcceleration;
				}
			}
		}
	};

	p._startDecelaration = function(){
		if(this._deceleration) return;
		this._deceleration = true;
		
		var self = this;
		
		var tick = function (){
			
			if(!self._deceleration) return;
			
			self._computeDeceleration();
			
			if(Math.abs(self.__speed) > self.options.minValidDist || self.__isout){
				window.requestAnimationFrame(tick);
			}else{
				self._deceleration = false;
				self.__isout = false;
				
				if(self.__needsSnap && self.options.snapping && !self.options.paging){
					self.value = self._checkLimits(self.end_loc + self.__extraMove);
				}else{
					self.value = Math.round(self.value);
				}
				
				self._callrenderer();
				self._callonComplete('decel');
			}
		};
		
		tick();
	};
	
	window.Controller = Controller;
	
})();

/* ================== bin-debug/js/pro/layers/LayerController.js =================== */
/**
 * Master Slider Layer Controller 
 * @author averta
 * @package Master Slider jQuery PRO
 * @since 2.11.1
 */
;(function(window, document, $){

	/**
	 * Layer Controller constructor
	 * @param {MSSlide} slide layer controller's slide.
	 */
	window.MSLayerController = function (slide) {
		this.slide = slide;
		this.slider = slide.slider;
		this.layers = [];
		this.layersCount = 0;
		this.preloadCount = 0;
		this.$layers = $('<div></div>').addClass('ms-slide-layers');
		this.$staticLayers = $('<div></div>').addClass('ms-static-layers');
		this.$fixedLayers = $('<div></div>').addClass('ms-fixed-layers');
		this.$animLayers = $('<div></div>').addClass('ms-anim-layers');

	};

	var p = MSLayerController.prototype;


	/*-----------------------------------------*\
		Public Methods								
	\*-----------------------------------------*/

	/**
	 * Adds new layer to the controller and slide
	 * @param {MSLayerElement} layer 
	 */
	p.addLayer = function (layer) {
		layer.slide = this.slide;
		layer.controller = this;

		// append layer element to the layers container based on `data-position` attribute. 
		switch ( layer.$element.data('position') ) {
			case 'static':
				this.hasStaticLayer = true;
				layer.$element.appendTo(this.$staticLayers);
				break;
			case 'fixed':
				this.hasFixedLayer = true;
				layer.$element.appendTo(this.$fixedLayers);
				break;
			default:
				layer.$element.appendTo(this.$animLayers);
				break;
		}
				
		layer.create();
		this.layers.push(layer);
		this.layersCount ++;

		// @since 1.7.0
		if( layer.parallax ){
			this.hasParallaxLayer = true;
		}

		if ( layer.needPreload ) {
			this.preloadCount ++; 
		}	
	};

	/**
	 * add layers over slide
	 * it calls after addLayer
	 */
	p.create = function () {
		this.slide.$element.append(this.$layers);
		this.$layers.append(this.$animLayers);

		if ( this.hasStaticLayer ) { 
			this.$layers.append(this.$staticLayers);
		}

		if(this.slider.options.layersMode == 'center'){
			this.$layers.css('max-width' , this.slider.options.width + 'px');

			if ( this.hasFixedLayer ) {
				this.$fixedLayers.css('max-width' , this.slider.options.width + 'px');
			}
		}
	};

	/**
	 * load layers that requires preloading
	 * @param {Function} callback onload callback function
	 */
	p.loadLayers = function (callback) {
		this._onReadyCallback = callback;

		if ( this.preloadCount === 0 ) {
			this._onlayersReady();
			return;
		}

		for(var i = 0 ; i !== this.layersCount; ++i){
			if(this.layers[i].needPreload) {
				this.layers[i].loadImage();
			}
		}
	};

	/**
	 * prepare layers to show over slide, this method will be called via `prepareToSelect` method of slide.
	 */
	p.prepareToShow = function () {
		if ( this.hasParallaxLayer ) {
			this._enableParallaxEffect();
		}

		if ( this.hasFixedLayer ) {
			this.$fixedLayers.prependTo(this.slide.view.$element);
		}
	};

	/**
	 * show layers over slide
	 */
	p.showLayers = function(){
		if ( this.layersHideTween ) {
			this.layersHideTween.stop(true);
		}

		if ( this.fixedLayersHideTween ) {
			this.fixedLayersHideTween.stop(true);
		}

		this._resetLayers();
		this.$animLayers.css('opacity', '').css('display', '');

		if ( this.hasFixedLayer ){
			this.$fixedLayers.css('opacity', '').css('display', '');
		}

		if ( this.ready ) {
			this._initLayers();
			this._locateLayers();
			this._startLayers();
		} 
	};

	/**
	 * hideLayers this method will be called via slide class. 
	 */
	p.hideLayers = function () {
		
		if( this.slide.selected || this.slider.options.instantStartLayers ){
			var that = this;
			that.layersHideTween = CTween.animate(this.$animLayers, 500, {opacity: 0}, {
				complete:function(){
					that._resetLayers();	
				}
			});

			if ( this.hasFixedLayer ) {
				this.fixedLayersHideTween = CTween.animate(this.$fixedLayers, 500, {opacity: 0}, {
					complete:function(){
						that.$fixedLayers.detach();
					}
				});
			}

			// disables parallax effect
			// @since 1.6.0
			if ( this.hasParallaxLayer ) {
				this._disableParallaxEffect();
			}
		}
	};

	/**
	 * hide layers from slide
	 */
	p.animHideLayers = function(){
		if ( !this.ready ) {
			return;
		}

		for(var i = 0; i !== this.layersCount; ++i){
			this.layers[i].hide();
		}
	};

	/**
	 * calculate new size of layers containers and locate layers
	 * @param {Number} width  slider width
	 * @param {Number} height slider height
	 * @param {Boolean} hard  whether call init layers.
	 */
	p.setSize = function (width, height, hard) {

		if ( this.ready && (this.slide.selected || this.hasStaticLayer) ) {
			if ( hard ) {
				this._initLayers(true);
			}
			this._locateLayers(!this.slide.selected);
		} 
		
		if ( this.slider.options.autoHeight ) {
			this.updateHeight();
		}

		if ( this.slider.options.layersMode == 'center' ) {
			var left = Math.max( 0 ,  (width - this.slider.options.width) / 2 ) + 'px';
			this.$layers[0].style.left = left;
			this.$fixedLayers[0].style.left = left;
		}
		
	};

	/**
	 * updates layers container height
	 */
	p.updateHeight = function () {
		var h = this.slide.getHeight() + 'px';
		this.$layers[0].style.height = h;
		this.$fixedLayers[0].style.height = h;
	};

	/**
	 * This method will be called by the last layer after loading all of layers.
	 */
	p._onlayersReady = function(){
		this.ready = true;

		if ( this.hasStaticLayer && !this.slide.isSleeping ) {
			this._initLayers(false, true);
		} 

		this._onReadyCallback.call(this.slide);
	};

	/**
	 * this method will be called by slide when it starts sleeping
	 */
	p.onSlideSleep = function () {

	};

	/**
	 * this method will be called by slide after waking up
	 */
	p.onSlideWakeup = function () {
		if ( this.hasStaticLayer && this.ready ) {
			this._initLayers(false, true);
		} 
	};

	/**
	 * destroy layer controller and stop layer animations
	 */
	p.destroy = function () {
		if ( this.slide.selected && this.hasParallaxLayer ) {
			this._disableParallaxEffect();
		}

		for(var i = 0; i < this.layersCount; ++i){
			this.layers[i].$element.stop(true).remove();
		}

		this.$layers.remove();
		this.$staticLayers.remove();
		this.$fixedLayers.remove();
		this.$animLayers.remove();
	};


	/*-----------------------------------------*\
		Private Methods								
	\*-----------------------------------------*/

	/**
	 * start layer effect
	 */
	p._startLayers = function(){
		for(var i = 0; i !== this.layersCount; ++i){
			this.layers[i].start();
		}
	};
	
	/**
	 * call init method of all layers
	 * @param  {Boolean} force 
	 */
	p._initLayers = function(force, onlyStatics){
		
		if ( this.init && !force || this.slider.init_safemode ) {
			return;
		}
		
		this.init = onlyStatics !== true;
		
		var i = 0;
		if ( onlyStatics && !this.staticsInit ) {  // init only static layers
			this.staticsInit = true;
			for ( ;i !== this.layersCount; ++i ) {
				if ( this.layers[i].staticLayer ) { 
					this.layers[i].init();
				}
			}
		} else if ( this.staticsInit && !force ) { // statics are already initiated, init dynamics
			for ( ;i !== this.layersCount; ++i ) {
				if ( !this.layers[i].staticLayer ){
					this.layers[i].init();	
				} 
			}
		} else {	 // init all
			for ( ;i !== this.layersCount; ++i ) {
				this.layers[i].init();	
			}
		}
	};
	
	/**
	 * locate layers over slide
	 */
	p._locateLayers = function (onlyStatics){
		var i = 0;
		if ( onlyStatics ) {  
			for ( ;i !== this.layersCount; ++i ) {
				if ( this.layers[i].staticLayer ) { 
					this.layers[i].locate();
				}
			}
		} else {
			for ( ;i !== this.layersCount; ++i ) {
				this.layers[i].locate();
			}
		}
	};
	
	/**
	 * rest layers
	 */
	p._resetLayers = function(){
		this.$animLayers.css('display', 'none').css('opacity',  1);
		for ( var i = 0; i !== this.layersCount; ++i ) {
			this.layers[i].reset();
		}
	};

	/**
	 * moves layers based on x and y
	 * @param  {Number} x    
	 * @param  {Number} y    
	 * @param  {Boolean} fast whether animate or not
	 */
	p._applyParallax = function(x, y, fast){
		for(var i = 0 ; i !== this.layersCount; ++i){
			if( this.layers[i].parallax != null ){
				this.layers[i].moveParallax(x, y, fast);
			}  
		}
	};

	/**
	 * enable parallax moving layers
	 */
	p._enableParallaxEffect = function(){ 
		if( this.slider.options.parallaxMode === 'swipe' ){
			this.slide.view.addEventListener(MSViewEvents.SCROLL, this._swipeParallaxMove, this);
		} else {
			this.slide.$element.on('mousemove' , {that:this}, this._mouseParallaxMove)
						 .on('mouseleave', {that:this}, this._resetParalax);
			/**
			 * Calculates new position of parallax based on device orintation gamma and beta
			 * @param  {Event} e 
			 * @since 1.6.0
			 */
			/*if( window._mobile && window.DeviceOrientationEvent ){
				
				var that = this;
				this.orientationParallaxMove = function(e){
					var beta = Math.round(e.beta),
						gamma = Math.round(e.gamma);
					
					that._applyParallax(beta * that.__width / 360 , -gamma * that.__height / 360);
				};

				window.addEventListener('deviceorientation', this.orientationParallaxMove, false);
			}*/
		}
	};

	/**
	 * disable parallax effect
	 */
	p._disableParallaxEffect = function(){
		if( this.slider.options.parallaxMode === 'swipe' ){
			this.slide.view.removeEventListener(MSViewEvents.SCROLL, this._swipeParallaxMove, this);
		} else {
			this.slide.$element.off('mousemove', this._mouseParallaxMove)
						 .off('mouseleave', this._resetParalax);
			
			/*if( window._mobile && window.DeviceOrientationEvent ){
				window.removeEventListener('deviceorientation', this.orientationParallaxMove);
			}*/
		}
	};

	/**
	 * reset layers parallax position to 0, 0 
	 */
	p._resetParalax = function(e){
		var that = e.data.that;
		that._applyParallax(0,0);
	};

	/**
	 * Calculates new mouse position over slide and moves layers
	 * @since 1.6.0
	 */
	p._mouseParallaxMove = function(e){
		var that = e.data.that,
			os = that.slide.$element.offset(),
			slider = that.slider;
			
			if( slider.options.parallaxMode !== 'mouse:y-only' ){
				var x = e.pageX - os.left - that.slide.__width  / 2;
			} else {
				var x = 0;
			}

			if( slider.options.parallaxMode !== 'mouse:x-only' ){
				var y = e.pageY - os.top  - that.slide.__height / 2;
			} else {
				var y = 0;
			}

		that._applyParallax(-x, -y);
	};


	/**
	 * Calculates new position of parallax based on slide position
	 * @param  {Event} e
	 * @since 1.6.0
	 */
	p._swipeParallaxMove = function(e){
		var value = this.slide.position - this.slide.view.__contPos;
		
		if ( this.slider.options.dir === 'v' ) {
			this._applyParallax(0, value, true);
		} else {
			this._applyParallax(value, 0, true);
		}
	};


})(window, document, jQuery);

/* ================== bin-debug/js/pro/layers/LayerEffects.js =================== */
;(function($){
	
	window.MSLayerEffects = {};
	
	var installed,
		_fade = {opacity:0};
		
	MSLayerEffects.setup = function(){
		
		if(installed) return;
		installed = true;
		
		var st 					= MSLayerEffects,
			transform_css 		= window._jcsspfx + 'Transform',
			transform_orig_css  = window._jcsspfx + 'TransformOrigin',
			o					= $.browser.opera; // Opera sucks :|
			_2d					= window._css2d && window._cssanim && !o;
		
		st.defaultValues = {left : 0 , top: 0 , opacity:(isMSIE('<=9')?1:'') , right:0 , bottom:0};
		st.defaultValues[transform_css] 	 = '';
		//st.defaultValues[transform_orig_css] = '';
		st.rf = 1;
		
		st.presetEffParams = {
			random: '30|300',
			long 	: 300,
			short	: 30,
			'false'	:false,
			'true'	:true,
			tl	 : 'top left'	,	bl: 'bottom left',
			tr   : 'top right'	,   br: 'bottom right', 
			rt   : 'top right'	,	lb: 'bottom left',
			lt   : 'top left'	,	rb: 'bottom right',
			t	 : 'top'		,	b : 'bottom',
			r	 : 'right'		,	l : 'left',
			c	 : 'center'	
		};
		
		
		/*
		 ----------------------------------------
		 				2D Effects
		 ----------------------------------------
		 */
		
		st.fade = function(){
			return _fade;
		};
	
		st.left = (_2d)? function(dist , fade){
			var r = fade === false ? {} : {opacity:0};
			r[transform_css] = 'translateX(' + -dist*st.rf + 'px)';
			return r;
		} : function (dist, fade){
			var r = fade === false ? {} : {opacity:0};
			r.left = -dist*st.rf + 'px';
			return r;
		};
		
		st.right = (_2d)? function(dist , fade){
			var r = fade === false ? {} : {opacity:0};
			r[transform_css] = 'translateX(' + dist*st.rf + 'px)';
			return r;
		} : function (dist, fade){
			var r = fade === false ? {} : {opacity:0};
			r.left = dist*st.rf + 'px';
			return r;
		};
		
		st.top = (_2d)? function(dist , fade){
			var r = fade === false ? {} : {opacity:0};
			r[transform_css] = 'translateY(' + -dist*st.rf + 'px)';
			return r;
		} : function (dist, fade){
			var r = fade === false ? {} : {opacity:0};
			r.top = -dist*st.rf + 'px';
			return r;
		};
		
		st.bottom = (_2d)? function(dist , fade){
			var r = fade === false ? {} : {opacity:0};
			r[transform_css] = 'translateY(' + dist*st.rf + 'px)';
			return r;
		} : function (dist, fade){
			var r = fade === false ? {} : {opacity:0};
			r.top = dist*st.rf + 'px';
			return r;
		};
		
		st.from = (_2d)? function(leftdis , topdis , fade){
			var r = fade === false ? {} : {opacity:0};
			r[transform_css] = 'translateX('+leftdis*st.rf+'px) translateY(' + topdis*st.rf + 'px)';
			return r;
		} : function (leftdis , topdis, fade){
			var r = fade === false ? {} : {opacity:0};
			r.top = topdis*st.rf + 'px';
			r.left = leftdis*st.rf + 'px';
			return r;
		};
		
		
		// --------------------------------------------------------------------
		
		st.rotate = (_2d)? function(deg , orig ){
			var r = {opacity: 0};
			r[transform_css] = ' rotate('+deg+'deg)';
			if(orig) r[transform_orig_css] = orig;
			return r;
		} : function (deg, orig){
			return _fade;
		};
		
		st.rotateleft = (_2d)? function(deg , dist , orig , fade){
			var r = st.left(dist , fade);
			r[transform_css] += ' rotate('+deg+'deg)';
			if(orig) r[transform_orig_css] = orig;
			return r;
		} : function (deg , dist , orig , fade){
			return st.left(dist , fade);
		};
		
		st.rotateright = (_2d)? function(deg , dist , orig , fade){
			var r = st.right(dist , fade);
			r[transform_css] += ' rotate('+deg+'deg)';
			if(orig) r[transform_orig_css] = orig;
			return r;
		} : function (deg , dist , orig , fade){
			return st.right(dist , fade);
		};
		
		st.rotatetop = (_2d)? function(deg , dist , orig , fade){
			var r = st.top(dist , fade);
			r[transform_css] += ' rotate('+deg+'deg)';
			if(orig) r[transform_orig_css] = orig;
			return r;
		} : function (deg , dist , orig , fade){
			return st.top(dist , fade);
		};
		
		st.rotatebottom = (_2d)? function(deg , dist , orig , fade){
			var r = st.bottom(dist , fade);
			r[transform_css] += ' rotate('+deg+'deg)';
			if(orig) r[transform_orig_css] = orig;
			return r;
		} : function (deg , dist , orig , fade){
			return st.bottom(dist , fade);
		};
			
		st.rotatefrom = (_2d)? function(deg , leftdis , topdis , orig , fade){
			var r = st.from(leftdis , topdis , fade);
			r[transform_css] += ' rotate('+deg+'deg)';
			if(orig) r[transform_orig_css] = orig;
			return r;
		} : function (deg , leftdis , topdis , orig , fade){
			return st.from(leftdis , topdis , fade);
		};
			
		st.skewleft = (_2d)? function(deg , dist , fade){
			var r = st.left(dist , fade);
			r[transform_css] += ' skewX(' + deg + 'deg)';
			return r;
		} : function (deg , dist , fade){
			return st.left(dist , fade);
		};	
		
		st.skewright = (_2d)? function(deg , dist , fade){
			var r = st.right(dist , fade);
			r[transform_css] += ' skewX(' + -deg + 'deg)';
			return r;
		} : function (deg , dist , fade){
			return st.right(dist , fade);
		};	
		
		st.skewtop = (_2d)? function(deg , dist , fade){
			var r = st.top(dist , fade);
			r[transform_css] += ' skewY(' + deg + 'deg)';
			return r;
		} : function (deg , dist , fade){
			return st.top(dist , fade);
		};	
		
		st.skewbottom = (_2d)? function(deg , dist , fade){
			var r = st.bottom(dist , fade);
			r[transform_css] += ' skewY(' + -deg + 'deg)';
			return r;
		} : function (deg , dist , fade){
			return st.bottom(dist , fade);
		};	
		
		
		st.scale = (_2d)? function(x , y , orig , fade){
			var r = fade === false ? {} : {opacity:0};
			r[transform_css] = ' scaleX('+x+') scaleY('+y+')';
			if(orig) r[transform_orig_css] = orig;
			return r;
		} : function (x , y , orig , fade){
			return fade === false ? {} : {opacity:0};
		};
		
		st.scaleleft = (_2d)? function(x , y  , dist , orig , fade){
			var r = st.left(dist , fade);
			r[transform_css] = ' scaleX('+x+') scaleY('+y+')';
			if(orig) r[transform_orig_css] = orig;
			return r;
		} : function (x , y  , dist , orig , fade){
			return st.left(dist , fade);
		};
		
		st.scaleright = (_2d)? function(x , y  , dist , orig , fade){
			var r = st.right(dist , fade);
			r[transform_css] = ' scaleX('+x+') scaleY('+y+')';
			if(orig) r[transform_orig_css] = orig;
			return r;
		} : function (x , y  , dist , orig , fade){
			return st.right(dist , fade);
		};
		
		st.scaletop = (_2d)? function(x , y  , dist , orig , fade){
			var r = st.top(dist , fade);
			r[transform_css] = ' scaleX('+x+') scaleY('+y+')';
			if(orig) r[transform_orig_css] = orig;
			return r;
		} : function (x , y  , dist , orig , fade){
			return st.top(dist , fade);
		};
		
		st.scalebottom = (_2d)? function(x , y  , dist , orig , fade){
			var r = st.bottom(dist , fade);
			r[transform_css] = ' scaleX('+x+') scaleY('+y+')';
			if(orig) r[transform_orig_css] = orig;
			return r;
		} : function (x , y  , dist , orig , fade){
			return st.bottom(dist , fade);
		};
			
		st.scalefrom = (_2d)? function(x , y  , leftdis , topdis , orig , fade){
			var r = st.from(leftdis , topdis , fade);
			r[transform_css] += ' scaleX('+x+') scaleY('+y+')';
			if(orig) r[transform_orig_css] = orig;
			return r;
		} : function (x , y  , leftdis , topdis , orig , fade){
			return st.from(leftdis , topdis , fade);
		};
		
		st.rotatescale = (_2d)? function(deg , x , y  ,  orig , fade){
			var r = st.scale(x , y , orig , fade);
			r[transform_css] += ' rotate('+deg+'deg)';
			if(orig) r[transform_orig_css] = orig;
			return r;
		} : function (deg , x , y  ,  orig , fade){
			return st.scale(x , y , orig , fade);
		};
		
		
		/*
		 ----------------------------------------
		 				3D Effects
		 ----------------------------------------
		 */
		
		st.front = (window._css3d)? function(dist , fade){
			var r = fade === false ? {} : {opacity:0};
			r[transform_css] = 'perspective(2000px) translate3d(0 , 0 ,' + dist + 'px ) rotate(0.001deg)';
			return r;
		} : function (dist){
			return _fade;
		};
		
		st.back = (window._css3d)? function(dist, fade){
			var r = fade === false ? {} : {opacity:0};
			r[transform_css] = 'perspective(2000px) translate3d(0 , 0 ,' + -dist + 'px ) rotate(0.001deg)';
			return r;
		} : function (dist){
			return _fade;
		};
		
		st.rotatefront = (window._css3d)? function(deg , dist , orig , fade ){
			var r = fade === false ? {} : {opacity:0};
			r[transform_css] = 'perspective(2000px) translate3d(0 , 0 ,' + dist + 'px ) rotate('+ (deg || 0.001) +'deg)';
			if(orig) r[transform_orig_css] = orig;
			return r;
		} : function (deg , dist , orig , fade ){
			return _fade;
		};
		
		st.rotateback = (window._css3d)? function(deg , dist , orig , fade ){
			var r = fade === false ? {} : {opacity:0};
			r[transform_css] = 'perspective(2000px) translate3d(0 , 0 ,' + -dist + 'px ) rotate('+ (deg || 0.001) +'deg)';
			if(orig) r[transform_orig_css] = orig;
			return r;
		} : function (deg , dist , orig , fade ){
			return _fade;
		};
						
		st.rotate3dleft = (window._css3d)? function(x , y , z , dist , orig , fade){
			var r = st.left(dist , fade);
			r[transform_css] += (x?' rotateX('+x+'deg)' : ' ')+(y?' rotateY('+y+'deg)' : '')+(z?' rotateZ('+z+'deg)' : '');
			if(orig) r[transform_orig_css] = orig;
			return r;		
			
		} : function (x , y , z , dist , orig , fade){
			return st.left(dist , fade);;
		};
		
		st.rotate3dright = (window._css3d)? function(x , y , z , dist , orig , fade){
			var r = st.right(dist , fade);
			r[transform_css] += (x?' rotateX('+x+'deg)' : ' ')+(y?' rotateY('+y+'deg)' : '')+(z?' rotateZ('+z+'deg)' : '');
			if(orig) r[transform_orig_css] = orig;
			return r;		
		} : function (x , y , z , dist , orig , fade){
			return st.right(dist , fade);;
		};
		
		st.rotate3dtop = (window._css3d)? function(x , y , z , dist , orig , fade){
			var r = st.top(dist , fade);
			r[transform_css] += (x?' rotateX('+x+'deg)' : ' ')+(y?' rotateY('+y+'deg)' : '')+(z?' rotateZ('+z+'deg)' : '');
			if(orig) r[transform_orig_css] = orig;
			return r;		
		} : function (x , y , z , dist , orig , fade){
			return st.top(dist , fade);;
		};
		
		st.rotate3dbottom = (window._css3d)? function(x , y , z , dist , orig , fade){
			var r = st.bottom(dist , fade);
			r[transform_css] += (x?' rotateX('+x+'deg)' : ' ')+(y?' rotateY('+y+'deg)' : '')+(z?' rotateZ('+z+'deg)' : '');
			if(orig) r[transform_orig_css] = orig;
			return r;		
		} : function (x , y , z , dist , orig , fade){
			return st.bottom(dist , fade);
		};
		
		st.rotate3dfront = (window._css3d)? function(x , y , z , dist , orig , fade){
			var r = st.front(dist , fade);
			r[transform_css] += (x?' rotateX('+x+'deg)' : ' ')+(y?' rotateY('+y+'deg)' : '')+(z?' rotateZ('+z+'deg)' : '');
			if(orig) r[transform_orig_css] = orig;
			return r;		
		} : function (x , y , z , dist , orig , fade){
			return st.front(dist , fade);
		};		
		
		st.rotate3dback = (window._css3d)? function(x , y , z , dist , orig , fade){
			var r = st.back(dist , fade);
			r[transform_css] += (x?' rotateX('+x+'deg)' : ' ')+(y?' rotateY('+y+'deg)' : '')+(z?' rotateZ('+z+'deg)' : '');
			if(orig) r[transform_orig_css] = orig;
			return r;		
		} : function (x , y , z , dist , orig , fade){
			return st.back(dist , fade);
		};

		// transform effect
		st.t = (window._css3d)? function(fade,tx,ty,tz,r,rx,ry,rz,scx,scy,skx,sky,ox,oy,oz){
			var _r = fade === false ? {} : {opacity:0};
			var transform = 'perspective(2000px) ';

			tx  !== 'n' && (transform += 'translateX(' + tx * st.rf + 'px) ');
			ty  !== 'n' && (transform += 'translateY(' + ty * st.rf + 'px) ');
			tz  !== 'n' && (transform += 'translateZ(' + tz * st.rf + 'px) ');
			r   !== 'n' && (transform += 'rotate(' + r + 'deg) ');
			rx  !== 'n' && (transform += 'rotateX(' + rx + 'deg) ');
			ry  !== 'n' && (transform += 'rotateY(' + ry + 'deg) ');
			rz  !== 'n' && (transform += 'rotateZ(' + rz + 'deg) ');
			skx !== 'n' && (transform += 'skewX(' + skx + 'deg) ');
			sky !== 'n' && (transform += 'skewY(' + sky + 'deg) ');
			scx !== 'n' && (transform += 'scaleX(' + scx + ') ');
			scy !== 'n' && (transform += 'scaleY(' + scy + ')');

			_r[transform_css] = transform;

			var trans_origin = '';

			trans_origin += (ox !== 'n' ? ox + '% ' : '50% '); 
			trans_origin += (oy !== 'n' ? oy + '% ' : '50% '); 
			trans_origin += (oz !== 'n' ? oz + 'px' : ''); 

			_r[transform_orig_css] = trans_origin;
			
			return _r;

		} : function(fade,tx,ty,tz,r,rx,ry,rz,scx,scy,skx,sky,ox,oy,oz) {

			var r = fade === false ? {} : {opacity:0};
			tx  !== 'n' && (r.left = tx * st.rf + 'px');
			ty  !== 'n' && (r.top  = ty * st.rf + 'px');
			return r;
		}			
	};
})(jQuery);

/* ================== bin-debug/js/pro/layers/LayerElement.js =================== */
/**
 * Master Slider Layer Element
 * @author Averta
 * @package Master Slider jQuery
 */

;(function($){
	
	/**
	 * master slider layer element constructor
	 */
	window.MSLayerElement = function(){
				
		// default layer start animation
		this.start_anim = {
			name		: 'fade',
			duration	: 1000,
			ease 		: 'linear',
			delay		: 0		
		};
		
		// default layer end animation
		this.end_anim = {
			duration	: 1000,
			ease 		: 'linear'
		};
		
		// default layer type
		this.type = 'text'; // video , image
		
		//this.swipe 		= true;
		this.resizable 	= true;
		this.minWidth 	= -1;
		this.isVisible  = true;
		
		// list of styles which should stores initial values and changes based on screen size for resizable layers
		this.__cssConfig = [
			'margin-top' 	,      'padding-top'	,
			'margin-bottom'	,      'padding-left'	,
			'margin-right'	,      'padding-right'	,
			'margin-left'	,      'padding-bottom' ,
			
			
			'font-size' 	,  		'line-height'	,
			/*'height'		, */	'width'			,			
			'left'			,       'right'			, 
			'top'			,       'bottom'		
		];
		
		this.baseStyle = {};
	};
	
	var p = MSLayerElement.prototype;
	
	/*--------------------------------------------------*\
		Public Methods
	\*--------------------------------------------------*/
	
	/**
	 * determine start animation for the layer
	 * @param {Objec} anim 
	 */
	p.setStartAnim = function(anim){ 
		$.extend(this.start_anim , anim); $.extend(this.start_anim, this._parseEff(this.start_anim.name)); 
		this.$element.css('visibility' , 'hidden');
	};

	/**
	 * determine end/hide animation for the layer
	 * @param {Object} anim
	 */
	p.setEndAnim = function(anim){
		$.extend(this.end_anim, anim); 
	};
	
	/**
	 * create layer object from layer element
	 */
	p.create = function(){
		this.$element.css('display', 'none');

		// resizable layer
		this.resizable = this.$element.data('resize') !== false;

		// fixed positioning
		this.fixed = this.$element.data('fixed') === true;

		// hide under parameter
		if( this.$element.data('widthlimit') !== undefined ) {
			this.minWidth = this.$element.data('widthlimit');
		}

		if( !this.end_anim.name ) {
			this.end_anim.name = this.start_anim.name;
		}

		if( this.end_anim.time ) {
			this.autoHide = true;//this.end_anim.delay = this.slide.delay * 1000 - this.end_anim.duration;
		}

		// is this layer static?
		this.staticLayer = this.$element.data('position') === 'static';
		this.fixedLayer = this.$element.data('position') === 'fixed';
		this.layersCont = this.controller.$layers;

		// make it visible if it's static
		if ( this.staticLayer ) {
			this.$element.css('display', '')
						 .css('visibility', '');
		}

		// create action event
		// @since v1.7.2
		if( this.$element.data('action') !== undefined ) {
			var slideController = this.slide.slider.slideController;
			this.$element.on('click', function(event){
				slideController.runAction($(this).data('action'));
				event.preventDefault();
			}).addClass('ms-action-layer');
		} 
		
		$.extend(this.end_anim  , this._parseEff(this.end_anim.name));
		this.slider = this.slide.slider;
		
		// new alignment method
		// @since v1.6.1
		var layerOrigin = this.layerOrigin = this.$element.data('origin');
		if ( layerOrigin ){

			var vOrigin  = layerOrigin.charAt(0),
				hOrigin  = layerOrigin.charAt(1),
				offsetX  = this.$element.data('offset-x'),
				offsetY  = this.$element.data('offset-y');

			if( offsetY === undefined ){
				offsetY = 0;
			}

			switch ( vOrigin ){
				case 't':
					this.$element[0].style.top = offsetY + 'px';
					break;
				case 'b':
					this.$element[0].style.bottom = offsetY + 'px';
					break;
				case 'm':
					this.$element[0].style.top = offsetY + 'px';
					this.middleAlign = true;
			}
			
			if( offsetX === undefined ){
				offsetX = 0;
			}

			switch ( hOrigin ){
				case 'l':
					this.$element[0].style.left = offsetX + 'px';
					break;
				case 'r':
					this.$element[0].style.right = offsetX + 'px';
					break;
				case 'c':
					this.$element[0].style.left = offsetX + 'px';
					this.centerAlign = true;
			}
		}

		// parallax effect 
		// @since v1.6.0
		this.parallax = this.$element.data('parallax')
		if( this.parallax != null ) {
			this.parallax /= 100;
			this.$parallaxElement = $('<div></div>').addClass('ms-parallax-layer');
			if( this.link ) { // only for image layer
				this.link.wrap(this.$parallaxElement);
				this.$parallaxElement = this.link.parent();
			} else {
				this.$element.wrap(this.$parallaxElement);
				this.$parallaxElement = this.$element.parent();
			}
			
			this._lastParaX = 0;
			this._lastParaY = 0;
			this._paraX = 0;
			this._paraY = 0;


			// add bottom 0 to the parallax element if layer origin specified to the bottom
			this.alignedToBot = this.layerOrigin && this.layerOrigin.indexOf('b') !== -1;
			if( this.alignedToBot ) {
				this.$parallaxElement.css('bottom', 0);
			}

			if( window._css3d ){
				this.parallaxRender = this._parallaxCSS3DRenderer;	
			} else if ( window._css2d ){
				this.parallaxRender = this._parallaxCSS2DRenderer;
			} else {
				this.parallaxRender = this._parallax2DRenderer;
			}

			if( this.slider.options.parallaxMode !== 'swipe' ){ // mouse mode
				averta.Ticker.add(this.parallaxRender, this);
			}
		}

		// remove all data- attributes excluding data-src
		$.removeDataAttrs(this.$element, ['data-src']);
	};

	/**
	 * initialize layer
	 */
	p.init = function(){
		//if(this.initialized) return;
		this.initialized = true;

		var value;
		
		this.$element.css('visibility' , '');
		// store initial layer styles
		for(var i = 0 , l = this.__cssConfig.length; i < l ; i ++){
			var key = this.__cssConfig[i];
			if( this.type === 'text' && key === 'width'){ // in some browsers using computed style for width in text layer causes unexpected word wrapping 
				value = this.$element[0].style.width;
			} else {
				value = this.$element.css(key);

				// fix for Google Chrome in ios, sometimes image layers over first slide not showing correctly. 
				if ( (key === 'width' || key === 'height') && value === '0px' ) {
					value = this.$element.data(key) + 'px';
				}
			}
			
			if( value != 'auto' && value != "" && value != "normal" ) { 
				this.baseStyle[key] = parseInt(value);
			}
		}

		// @since v1.6.0
		if ( this.middleAlign ){
			this.baseHeight = this.$element.outerHeight(false);//this.$element.height();
		}

		if ( this.centerAlign ){
			// in some browsers using computed style for width in text layer causes unexpected word wrapping 
			//if ( this.type === 'text' ){
			//	this.baseWidth = parseInt(this.$element[0].style.width);
			//} else {
				this.baseWidth = this.$element.outerWidth(false);
			//}
		}

	};
	
	/**
	 * locate layer over slider
	 */
	p.locate = function(){
		// is slide ready?		
		if ( !this.slide.ready ) {
			return;
		}
		
		var width 		= parseFloat(this.layersCont.css('width')),
			height 		= parseFloat(this.layersCont.css('height')),
			factor, isPosition;
		
		if( !this.staticLayer && this.$element.css('display') === 'none' && this.isVisible) {
			this.$element.css('display', '')
						 .css('visibility', 'hidden');
		} 

		factor = this.resizeFactor 	= width / this.slide.slider.options.width;
		// updated @since v1.6.1
		for (var key in this.baseStyle) {

			isPosition = key === 'top' || key === 'left' || key === 'bottom' || key === 'right';

			//switch resize/position factor
			if( this.fixed && isPosition ){
				factor = 1;
			} else {
				factor = this.resizeFactor;
			}

			if( !this.resizable && !isPosition ){
				continue;
			}

			if ( key === 'top' && this.middleAlign ){
				this.$element[0].style.top = '0px';
				this.baseHeight = this.$element.outerHeight(false);
				this.$element[0].style.top = this.baseStyle['top'] * factor + (height - this.baseHeight) / 2  + 'px';
			} else if ( key === 'left' && this.centerAlign ){
				this.$element[0].style.left = '0px';
				this.baseWidth = this.$element.outerWidth(false);
				this.$element[0].style.left = this.baseStyle['left'] * factor + (width - this.baseWidth) / 2  + 'px';
			} else { 
				this.$element.css(key , this.baseStyle[key] * factor + 'px');
			}
		}
		
		this.visible(this.minWidth < width);
	};
	
	/**
	 * start layer animation
	 */
	p.start = function(){
		
		// is it already showing or is it a static layer?
		if ( this.isShowing || this.staticLayer ) {
			return;
		}

		this.isShowing = true;
		
		var key , base;

		// reads css value form LayerEffects
		MSLayerEffects.rf = this.resizeFactor;
		var effect_css = MSLayerEffects[this.start_anim.eff_name].apply(null , this._parseEffParams(this.start_anim.eff_params));
		
		// checkes effect css and defines TO css values
		var start_css_eff = {};
		
		// set from position
		for(key in effect_css){

			// check the position key (top, left, right or bottom) for animatin
			// It mostly will be used in old browsers
			// In effect left:100, layer base style right:300 -> effect changes to right:100
			if( this._checkPosKey(key , effect_css) ){
				continue;
			}

			// set default value from Layer Effects Class
			if( MSLayerEffects.defaultValues[key] != null ){
				start_css_eff[key] = MSLayerEffects.defaultValues[key];
			}

			if( key in this.baseStyle ){
				base = this.baseStyle[key];

				// updated @since v1.6.1
				if ( this.middleAlign && key === 'top' ){
					base += (parseInt(this.layersCont.height()) - this.$element.outerHeight(false)) / 2;				
				}

				if ( this.centerAlign && key === 'left' ){
					base += (parseInt(this.layersCont.width()) - this.$element.outerWidth(false)) / 2;				
				}
				//----------------------

				effect_css[key] = base + parseFloat(effect_css[key]) + 'px';
				start_css_eff[key] = base + 'px';
			}

			this.$element.css(key , effect_css[key]);
		}
		
		var that = this;

		clearTimeout(this.to);
		this.to = setTimeout(function(){
			//that.locate();
			that.$element.css('visibility', '');
			that._playAnimation(that.start_anim , start_css_eff);
		} , that.start_anim.delay || 0.01);
		
		
		this.clTo = setTimeout(function(){
			that.show_cl = true;
		},(this.start_anim.delay || 0.01) + this.start_anim.duration);
		 
		if( this.autoHide ){
			clearTimeout(this.hto);
			this.hto = setTimeout(function(){that.hide();} , that.end_anim.time );
		}

	};
	
	/** 
	 * starts hide animation 
	 */
	p.hide = function(){

		// static layers doesn't support animations
		if ( this.staticLayer ) { 
			return;
		}

		this.isShowing = false;
		
		// reads css value form LayerEffects
		var effect_css = MSLayerEffects[this.end_anim.eff_name].apply(null , this._parseEffParams(this.end_anim.eff_params));
		
		for(key in effect_css){
			
			if(this._checkPosKey(key , effect_css)) continue;
			
			if( key === window._jcsspfx + 'TransformOrigin' ){
				this.$element.css(key , effect_css[key]);
			}

			if(key in this.baseStyle){
				effect_css[key] = this.baseStyle[key] + parseFloat(effect_css[key]) +  'px';
			}
				
		}
		
		this._playAnimation(this.end_anim , effect_css);
		
		clearTimeout(this.to);
		clearTimeout(this.hto);		
		clearTimeout(this.clTo);		
	};
	
	/**
	 * reset layer
	 */
	p.reset = function(){
		if ( this.staticLayer ) {
			return;
		}

		this.isShowing = false;
		//this.$element.css(window._csspfx + 'animation-name', ''	);
		this.$element[0].style.display = 'none';
		this.$element.css('opacity', '');
		this.$element[0].style['transitionDuration'] = '';
		
		if(this.show_tween)
			this.show_tween.stop(true);
		
		clearTimeout(this.to);
		clearTimeout(this.hto);
	};
	
	/**
	 * destroy layer
	 */
	p.destroy = function(){
		this.reset();
		this.$element.remove();
	};
	
	/**
	 * change the visibility status
	 * @param  {Boolean} value 
	 */
	p.visible = function(value){
		if(this.isVisible == value) return;

		this.isVisible = value;
		
		this.$element.css('display' , (value ? '' : 'none'));		
	};

	/**
	 * Change the detestation of parallax position 
	 * @param  {Number} x 
	 * @param  {Number} y
	 * @since  1.6.0
	 */
	p.moveParallax = function(x, y , fast){
		this._paraX = x;
		this._paraY = y;
		if( fast ){
			this._lastParaX = x;
			this._lastParaY = y;
			this.parallaxRender();
		}
	};

	/*------------------------------------*\
		Private Methods
	\*------------------------------------*/

	/**
	 * play layer animation
	 * @param  {Obeject} animation layer animation object
	 * @param  {Object} css       animation css object
	 */
	p._playAnimation = function(animation , css){	
		var options = {};

		if(animation.ease){
			options.ease = animation.ease;
		}
		
		options.transProperty = window._csspfx + 'transform,opacity';

		this.show_tween = CTween.animate(this.$element, animation.duration , css , options);					
	};
	
	/**
	 * generate random value
	 * @param  {String} value the pattern value min|max
	 * @return {Number}
	 */
	p._randomParam = function(value){
		var min = Number(value.slice(0,value.indexOf('|')));
		var max = Number(value.slice(value.indexOf('|')+1));
		
		return min + Math.random() * (max - min);
	};
	
	/**
	 * parse effect function
	 * @param  {String} eff_name effect function
	 * @return {Object}          
	 */
	p._parseEff = function(eff_name){
		
		var eff_params = [];
		
		if ( eff_name.indexOf('(') !== -1 ) {
			var temp   = eff_name.slice(0 , eff_name.indexOf('(')).toLowerCase();
			var	value;
			
			eff_params = eff_name.slice(eff_name.indexOf('(') + 1 , -1).replace(/\"|\'|\s/g , '').split(',');
			eff_name   = temp;
		
			for ( var i = 0, l = eff_params.length; i < l; ++i) {
				value = eff_params[i];
				
				if ( value in MSLayerEffects.presetEffParams) {
					value = MSLayerEffects.presetEffParams[value];
				}
				
				eff_params[i] = value;
			}
		}
		
		return {eff_name:eff_name , eff_params:eff_params};
	};
	
	/**
	 * parse effect function parameters
	 * @param  {Aarray} params effect parameters
	 * @return {Array}        
	 */
	p._parseEffParams = function(params){
		var eff_params = [];
		for(var i = 0 , l = params.length; i < l ; ++i){
			var value = params[i];
			if(typeof value === 'string' && value.indexOf('|') !== -1) value = this._randomParam(value);
			
			eff_params[i] = value;
		}
		
		return eff_params;
	};
	
	/**
	 * calculates layer position based on initial positioning style and layer effect 
	 * @param  {string} key   positioning key
	 * @param  {Object} style style object 
	 * @return {Boolean}    
	 */
	p._checkPosKey = function(key , style){		
		if(key === 'left' && !(key in this.baseStyle) && 'right' in this.baseStyle){
			 style.right = -parseInt(style.left) + 'px';
			 delete style.left;
			 return true;
		}
		
		if(key === 'top'  && !(key in this.baseStyle) && 'bottom' in this.baseStyle){
			style.bottom = -parseInt(style.top) + 'px';
			delete style.top;
			return true;
		} 
		
		return false;
	};

	/**
	 * calculate parallax position
	 */
	p._parallaxCalc = function(){
		var x_def = this._paraX - this._lastParaX,
			y_def = this._paraY - this._lastParaY;

		this._lastParaX += x_def / 12;
		this._lastParaY += y_def / 12;

		if( Math.abs( x_def ) < 0.019 ) {
			this._lastParaX = this._paraX;
		}

		if( Math.abs( y_def ) < 0.019 ) {
			this._lastParaY = this._paraY;
		}

	}

	/**
	 * Parallax move ticker function
	 */
	p._parallaxCSS3DRenderer = function(){
		this._parallaxCalc();
		this.$parallaxElement[0].style[window._jcsspfx + 'Transform'] = 'translateX(' + this._lastParaX * this.parallax + 'px) translateY(' + this._lastParaY * this.parallax + 'px) translateZ(0)';
	};

	/**
	 * parallax move ticker for CSS2 browsers
	 * @return {[type]} [description]
	 */
	p._parallaxCSS2DRenderer = function(){
		this._parallaxCalc();
		this.$parallaxElement[0].style[window._jcsspfx + 'Transform'] = 'translateX(' + this._lastParaX * this.parallax + 'px) translateY(' + this._lastParaY * this.parallax + 'px)';
	};

	/**
	 * parallax move ticker for zombie browsers
	 */
	p._parallax2DRenderer = function(){
		this._parallaxCalc();
		
		// change bottom instead of top if layer aligned to the bottom (origin)
		if( this.alignedToBot ) {
			this.$parallaxElement[0].style.bottom  = this._lastParaY * this.parallax + 'px';
		} else { 
			this.$parallaxElement[0].style.top  = this._lastParaY * this.parallax + 'px';
		}
		
		this.$parallaxElement[0].style.left = this._lastParaX * this.parallax + 'px';
	};
	
})(jQuery);

/* ================== bin-debug/js/pro/layers/ImageLayerElement.js =================== */
;(function($){
	
	window.MSImageLayerElement = function(){
		MSLayerElement.call(this);
		this.needPreload = true;
		
		this.__cssConfig = [
			'width'			,		'height'		,
			'margin-top' 	,      'padding-top'	,
			'margin-bottom'	,      'padding-left'	,
			'margin-right'	,      'padding-right'	,
			'margin-left'	,      'padding-bottom' ,
			
			'left'			,       'right'			, 
			'top'			,       'bottom'		
		];
		
		this.type = 'image';
	};
	
	MSImageLayerElement.extend(MSLayerElement);
	
	var p = MSImageLayerElement.prototype;
	var _super = MSLayerElement.prototype;
	
	/*-------------- METHODS --------------*/
	
	p.create = function(){
		
		if(this.link){
			var p = this.$element.parent();
			p.append(this.link);
			this.link.append(this.$element);
			this.link.removeClass('ms-layer');
			this.$element.addClass('ms-layer');
			p = null;
		}

		_super.create.call(this);
		
		if(this.$element.data('src') != undefined){
			this.img_src = this.$element.data('src');
			this.$element.removeAttr('data-src');
		}else{
			var that = this;
			this.$element.on('load', function(event){
				that.controller.preloadCount--;
				if(that.controller.preloadCount === 0)
					that.controller._onlayersReady();
			}).each($.jqLoadFix);
		}
		
		if($.browser.msie)
			this.$element.on('dragstart', function(event) { event.preventDefault(); }); // disable native dragging
	};
	
	p.loadImage = function(){
		var that = this;

		this.$element.preloadImg(this.img_src , function(event){
			//this.$element.width(event.width).height(event.height);
			that.controller.preloadCount--;
			if(that.controller.preloadCount === 0) that.controller._onlayersReady();
		});
	};
	
})(jQuery);

/* ================== bin-debug/js/pro/layers/VideoLayerElement.js =================== */
;(function($){
	
	window.MSVideoLayerElement = function(){
		MSLayerElement.call(this);
		
		this.__cssConfig.push(
				'height'
		);
	
		this.type = 'video';
	};
	
	MSVideoLayerElement.extend(MSLayerElement);
	
	var p  = MSVideoLayerElement.prototype;
	var _super  = MSLayerElement.prototype;
	
	/*-------------- METHODS --------------*/
	p.__playVideo = function(){
		if(this.img)CTween.fadeOut(this.img , 500 , 2);
		CTween.fadeOut(this.video_btn , 500 , 2);
		this.video_frame.attr('src' , 'about:blank').css('display' , 'block');
		if(this.video_url.indexOf('?') == -1) this.video_url += '?';
		this.video_frame.attr('src' , this.video_url + '&autoplay=1');
	};

	p.start = function(){
		_super.start.call(this);

		if ( this.$element.data('autoplay') ) {
			this.__playVideo();
		}
	};

	p.reset = function(){
		_super.reset.call(this);
		
		if(this.needPreload || this.$element.data('btn')){
			this.video_btn.css('opacity' , 1).css('display', 'block');
			this.video_frame.attr('src' , 'about:blank').css('display' , 'none');
		}
		
		if(this.needPreload){
			this.img.css('opacity' , 1).css('display', 'block');	
			return;
		}
		
		this.video_frame.attr('src' , this.video_url);
	};

	p.create = function(){
		_super.create.call(this);

		this.video_frame = this.$element.find('iframe').css({width:'100%' , height:'100%'});
		this.video_url   = this.video_frame.attr('src');
		
		var has_img = this.$element.has('img').length != 0;
		
		if(!has_img && !this.$element.data('btn')) return;
		
		this.video_frame.attr('src' , 'about:blank').css('display' , 'none');
		
		var that = this;
		
		this.video_btn = $('<div></div>').appendTo(this.$element).addClass('ms-video-btn').click(function() {
			that.__playVideo();
		});
		
		//this.video_frame.attr('src' , 'about:blank');
		
		if(!has_img) return;
		
		this.needPreload = true;
		this.img = this.$element.find('img:first').addClass('ms-video-img');
		
		if(this.img.data('src') !== undefined){
			this.img_src = this.img.data('src');
			this.img.removeAttr('data-src');
		}else{
			var that = this;
			this.img.attr('src' , this.img_src).on('load', function(event) {
				that.controller.preloadCount--;
				if(that.controller.preloadCount === 0)
					that.controller._onlayersReady();
			}).each($.jqLoadFix);
		}
		
		if($.browser.msie)
			this.img.on('dragstart', function(event) { event.preventDefault(); }); // disables native dragging
	};
	
	p.loadImage = function(){
		var that = this;
		this.img.preloadImg(this.img_src, function(event) {
			that.controller.preloadCount--;
			if(that.controller.preloadCount === 0) that.controller._onlayersReady();
		});
	};
	
})(jQuery);

/* ================== bin-debug/js/pro/layers/HotspotLayer.js =================== */
;(function($){

	"use strict";
	
	window.MSHotspotLayer = function(){
		MSLayerElement.call(this);
		
		this.__cssConfig = [
			'margin-top' 	,      'padding-top'	,
			'margin-bottom'	,      'padding-left'	,
			'margin-right'	,      'padding-right'	,
			'margin-left'	,      'padding-bottom' ,
			
			'left'			,       'right'			, 
			'top'			,       'bottom'		
		];
		
		
		this.ease = 'Expo'; 
		this.hide_start = true;
		this.type = 'hotspot';
	};
	
	MSHotspotLayer.extend(MSLayerElement);
	
	var p = MSHotspotLayer.prototype;
	var _super = MSLayerElement.prototype;
	
	/*-------------- METHODS --------------*/
	
	p._showTT = function(){
		if(!this.show_cl)  return;
		
		clearTimeout(this.hto);
		if(this._tween)	this._tween.stop(true);	
		
		if( this.hide_start ){
			this.align = this._orgAlign;
			this._locateTT();
			
			this.tt.css({display:'block'});
			this._tween = CTween.animate(this.tt , 900 , this.to , {ease:'easeOut'+this.ease});
			this.hide_start = false;
		}

	};
	
	p._hideTT = function(){
		if(!this.show_cl)  return;
		if(this._tween)	this._tween.stop(true);
		
		var that = this;
		
		clearTimeout(this.hto);
		this.hto = setTimeout(function(){
			that.hide_start = true;
			that._tween = CTween.animate(that.tt , 900 , that.from , {ease:'easeOut'+that.ease , complete:function(){that.tt.css('display' , 'none');}} );
		} , 200);
	};
	
	p._updateClassName = function(name){
		if(this._lastClass)	this.tt.removeClass(this._lastClass);
		this.tt.addClass(name);
		this._lastClass = name;
	}
	
	p._alignPolicy = function(){
		var h = this.tt.outerHeight(false),
		    w = Math.max(this.tt.outerWidth(false) , parseInt(this.tt.css('max-width'))),
		 	ww = window.innerWidth,
		 	wh = window.innerHeight;
		 	
		switch(this.align){
			case 'top':
				if(this.base_t < 0 )
					return 'bottom';
			break;
			case 'right':
				if(this.base_l + w > ww || this.base_t < 0)
					return 'bottom';
			break;
			case 'left':
				if(this.base_l < 0 || this.base_t < 0)
					return 'bottom';
			break;
		}
		
		return null;	
	};
		
	p._locateTT = function(){
		var os = this.$element.offset(),
		os2 = this.slide.slider.$element.offset();
		
		var dist = 50,
			space = 15 //* this.factor;
		
		this.pos_x = os.left - os2.left - this.slide.slider.$element.scrollLeft();
		this.pos_y = os.top - os2.top - this.slide.slider.$element.scrollTop();
		
		this.from = {opacity:0};
		this.to = {opacity:1};
		
		this._updateClassName('ms-tooltip-'+this.align);
		this.tt_arrow.css('margin-left' , '');
		
		var arrow_w = 15,//parseInt(this.tt_arrow.css('border-left')) + parseInt(this.tt_arrow.css('border-right')),
			arrow_h = 15;//parseInt(this.tt_arrow.css('border-top'))  + parseInt(this.tt_arrow.css('border-bottom'));
			
			//console.log(arrow_h,arrow_w);
		//
		switch(this.align){
			case 'top':
				var w = Math.min(this.tt.outerWidth(false) , parseInt(this.tt.css('max-width')));
				this.base_t = this.pos_y - this.tt.outerHeight(false) - arrow_h - space;
				this.base_l = this.pos_x - w/2;
				
				if(this.base_l + w > window.innerWidth){
					this.tt_arrow.css('margin-left' , -arrow_w/2 + this.base_l + w -window.innerWidth + 'px');
					this.base_l = window.innerWidth - w;
				}
				
				if(this.base_l < 0){
					this.base_l = 0;
					this.tt_arrow.css('margin-left' , -arrow_w/2 + this.pos_x - this.tt.outerWidth(false) / 2 + 'px');
				}
				
				if(window._css3d){
					this.from[window._jcsspfx+'Transform'] = 'translateY(-'+dist+'px)';
					this.to[window._jcsspfx+'Transform']   = '';
				}else{	
					this.from.top = (this.base_t - dist) + 'px';
					this.to.top = this.base_t + 'px';
				}

			break;
			case 'bottom':
				var w = Math.min(this.tt.outerWidth(false) , parseInt(this.tt.css('max-width')));
				
				this.base_t = this.pos_y + arrow_h + space;
				this.base_l = this.pos_x - w/2;
				
				if(this.base_l + w > window.innerWidth){
					this.tt_arrow.css('margin-left' , -arrow_w/2 + this.base_l + w -window.innerWidth + 'px');
					this.base_l = window.innerWidth - w;
				}
				
				if(this.base_l < 0){
					this.base_l = 0;
					this.tt_arrow.css('margin-left' , -arrow_w/2 + this.pos_x - this.tt.outerWidth(false) / 2 + 'px');
				}
				
				if(window._css3d){
					this.from[window._jcsspfx+'Transform'] = 'translateY('+dist+'px)';
					this.to[window._jcsspfx+'Transform'] = '';
				}else{
					this.from.top = (this.base_t + dist) + 'px';
					this.to.top = this.base_t + 'px';
				}
				
			break;
			
			case 'right':
				this.base_l = this.pos_x + arrow_w + space;
				this.base_t = this.pos_y - this.tt.outerHeight(false) / 2;
				
				if(window._css3d){
					this.from[window._jcsspfx+'Transform'] = 'translateX('+dist+'px)';
					this.to[window._jcsspfx+'Transform'] = '';
				}else{
					this.from.left = (this.base_l + dist) + 'px';
					this.to.left = this.base_l + 'px';
				}
				
			break;
			case 'left':
				this.base_l = this.pos_x - arrow_w - this.tt.outerWidth(false) - space;
				this.base_t = this.pos_y - this.tt.outerHeight(false) / 2;
				
				if(window._css3d){
					this.from[window._jcsspfx+'Transform'] = 'translateX(-'+dist+'px)';
					this.to[window._jcsspfx+'Transform'] = '';
				}else{
					this.from.left = (this.base_l - dist) + 'px';
					this.to.left = this.base_l + 'px';
				}
				
			break;
		}
		
		
		
		var policyAlign = this._alignPolicy();
		if(policyAlign !== null){
			this.align = policyAlign;
			this._locateTT();
			return;
		}
		
		this.tt.css('top'  ,parseInt(this.base_t)+'px').
				css('left' ,parseInt(this.base_l)+'px');
		
		this.tt.css(this.from);		
		
	};
	
	p.start = function(){
		_super.start.call(this);
		this.tt.appendTo(this.slide.slider.$element);
		//this._locateTT();
		this.tt.css('display' , 'none');
	};
	
	p.reset = function(){
		_super.reset.call(this);
		this.tt.detach();
	};
	
	/**
	 * locate hotspot over slide
	 * @override LayerElement.locate
	 * @since 2.2.0
	 */
/*	p.locate = function(){
		_super.locate.call(this);

		if ( this.relativeToBG ) {
			console.log(this.baseOffsetX , this.slide.$bg_img.width()  , this.slide.bgWidth)
			this.$element[0].style.left = this.baseOffsetX * this.slide.$bg_img.width()  / this.slide.bgWidth + 'px';
			this.$element[0].style.top  = this.baseOffsetY * this.slide.$bg_img.height() / this.slide.bgHeight + 'px';
		} 

	};
*/
	p.create = function(){
		var that = this;
		
		//@since 2.2.0
		//chnage offset progin to top left
	/*	this.relativeToBG = this.$element.data('relative') && (this.slide.fillMode === 'fill' || this.slide.fillMode === 'fit');
		if ( this.relativeToBG ) {

			var origin = this.$element.data('origin'),
				osy = this.$element.data('offset-y'), 
				osx = this.$element.data('offset-x');

			if ( origin ) {
				if ( origin.charAt(0) === 'b' ){
					osy = this.slide.slider.options.height - this.$element.data('offset-y');
					this.$element.data('offset-y',  osy);
				}

				if ( origin.charAt(1) === 'r' ){
					osx = this.slide.slider.options.width - this.$element.data('offset-x');
					this.$element.data('offset-x', osx);
				}

			}

			this.$element.data('origin', 'tl');

			this.baseOffsetX = osx;
			this.baseOffsetY = osy;
		}*/

		
		this._orgAlign = this.align = this.$element.data('align') !== undefined ? this.$element.data('align') : 'top';
		
		this.data = this.$element.html();
		
		this.$element.html('').on('mouseenter' , function(){that._showTT();}).on('mouseleave',function(){that._hideTT();});
		
		this.point = $('<div><div class="ms-point-center"></div><div class="ms-point-border"></div></div>')
					.addClass('ms-tooltip-point')
					.appendTo(this.$element);

		var link = this.$element.data('link'),
			target = this.$element.data('target');

		if( link ){
			this.point.on('click', function(){window.open(link , target || '_self');});
		}

		this.tt =  $('<div></div>')
					.addClass('ms-tooltip')
					//.addClass('ms-tooltip-'+this.align)
					.css('display','hidden')
					.css('opacity' , 0);

		// @since v1.6.1
		if( this.$element.data('width') !== undefined ){
			this.tt.css('width', this.$element.data('width'))
				   .css('max-width', this.$element.data('width'));
		}
		
		this.tt_arrow = $('<div></div>')
						.addClass('ms-tooltip-arrow')
						.appendTo(this.tt);
		
		this._updateClassName('ms-tooltip-'+this.align);
		
		this.ttcont = $('<div></div>')
					  .addClass('ms-tooltip-cont')
					  .html(this.data)
					  .appendTo(this.tt)


		if( this.$element.data('stay-hover') === true ) {
			this.tt.on('mouseenter' , function(){
				if( that.hide_start ){
					return
				}
				clearTimeout(that.hto);
				that._tween.stop(true);
				that._showTT();
			}).on('mouseleave', function(){
				that._hideTT();
			});
		}

		_super.create.call(this);
	};

})(jQuery);

/* ================== bin-debug/js/pro/layers/ButtonLayer.js =================== */
/**
 * Master Slider Button Layer
 * @author Averta
 * @since 1.7.2
 * @extends {MSLayerElement}
 */
(function($){

	window.MSButtonLayer = function(){
		MSLayerElement.call(this);
		
		this.type = 'button';
	};
	
	MSButtonLayer.extend(MSLayerElement);
	
	var p = MSButtonLayer.prototype;
	var _super = MSLayerElement.prototype;
	
	var positionKies = ['top', 'left', 'bottom', 'right'];

	/*-------------- METHODS --------------*/
	
	p.create = function(){
		_super.create.call(this);
		this.$element.wrap('<div class="ms-btn-container"></div>').css('position', 'relative');
		this.$container = this.$element.parent();
	};

	p.locate = function(){
		_super.locate.call(this);
		var key, tempValue;

		for (var i=0; i<4; i++){
			key = positionKies[i];
			if ( key in this.baseStyle ) {
				tempValue = this.$element.css(key);
				this.$element.css(key, '');
				this.$container.css(key, tempValue);
			}
		}

		this.$container.width(this.$element.outerWidth(true))
					   .height(this.$element.outerHeight(true));
	};
	
})(jQuery);

/* ================== bin-debug/js/pro/controls/SliderEvent.js =================== */
window.MSSliderEvent = function (type){
	this.type = type;
};

MSSliderEvent.CHANGE_START      	= 'ms_changestart';
MSSliderEvent.CHANGE_END       		= 'ms_changeend';
MSSliderEvent.WAITING		      	= 'ms_waiting';
MSSliderEvent.AUTOPLAY_CHANGE   	= 'ms_autoplaychange';
MSSliderEvent.VIDEO_PLAY		   	= 'ms_videoPlay';
MSSliderEvent.VIDEO_CLOSE		   	= 'ms_videoclose';
MSSliderEvent.INIT					= 'ms_init';
MSSliderEvent.HARD_UPDATE			= 'ms_hard_update';
MSSliderEvent.RESIZE				= 'ms_resize';
MSSliderEvent.RESERVED_SPACE_CHANGE = 'ms_rsc'; // internal use
MSSliderEvent.DESTROY				= 'ms_destroy';

/* ================== bin-debug/js/pro/controls/Slide.js =================== */
/**
 * Master Slider Slide Class
 * @author averta
 * @package Master Slider jQuery 
 */
;(function(window, document, $){
	
	"use strict";
	
	window.MSSlide = function(){
		
		this.$element = null;
		this.$loading = $('<div></div>').addClass('ms-slide-loading');

		this.view 		= null;
		this.index 		= -1;
		
		this.__width 	= 0;
		this.__height 	= 0;
		
		this.fillMode = 'fill'; // fill , fit , stretch , tile , center
		
		this.selected = false;
		this.pselected = false;
		this.autoAppend = true;
		this.isSleeping = true;
		
		this.moz = $.browser.mozilla;
	};
	
	var p = MSSlide.prototype;
				
	/**
	 * on swipe start handler
	 */
	p.onSwipeStart = function(){
		//this.$layers.css(window._csspfx + 'transition-duration' , '0ms');
		if ( this.link ) { 
			this.linkdis = true;
		}

		if ( this.video ) { 
			this.videodis = true;
		}
	};

	/**
	 * on swipe move handler
	 */
	p.onSwipeMove = function (e) {
		var move = Math.max(Math.abs(e.data.distanceX), Math.abs(e.data.distanceY));
		this.swipeMoved = move > 4;
	};
	
	/**
	 * on swipe cancel handler
	 */
	p.onSwipeCancel = function(e){
		if ( this.swipeMoved ) { 
			this.swipeMoved = false;
			return;
		}

		if ( this.link ) { 
			this.linkdis = false;
		}
		
		if ( this.video ) { 
			this.videodis = false;
		}
		//this.$layers.css(window._csspfx + 'transition-duration' , this.view.__slideDuration + 'ms');
	};

	/**
	 * setup layer controller for the slide
	 * @since 2.11.0
	 */
	p.setupLayerController = function () {
		this.hasLayers = true;
		this.layerController = new MSLayerController(this);
	};
	/**
	 * this method called after loading all assets related to this slide
	 */
	p.assetsLoaded = function(){
		this.ready = true;
		this.slider.api._startTimer();
		
		if( this.selected || (this.pselected && this.slider.options.instantStartLayers) ){

			if ( this.hasLayers ) {
				this.layerController.showLayers();	
			}

			if(this.vinit){
				this.bgvideo.play();
				if( !this.autoPauseBgVid ) {
					this.bgvideo.currentTime = 0;
				}
			}

		}
		if ( !this.isSleeping ) {
			this.setupBG();
		}

		CTween.fadeOut(this.$loading , 300 , true);
		
		//sequence loading
		if ( (this.slider.options.preload === 0 || this.slider.options.preload === 'all') && this.index < this.view.slideList.length - 1 ) {
			this.view.slideList[this.index + 1].loadImages();
		} else if ( this.slider.options.preload === 'all' && this.index === this.view.slideList.length - 1 ){
			this.slider._removeLoading();
		}
		
	};

	/**
	 * adds backgroun image to the slider
	 * @param {Element} img slide image element
	 */
	p.setBG = function(img){
		this.hasBG = true;	
		var that = this;
		
		this.$imgcont = $('<div></div>').addClass('ms-slide-bgcont');
		
		this.$element.append(this.$loading)
			   		 .append(this.$imgcont);
		
		this.$bg_img = $(img).css('visibility' , 'hidden');
		this.$imgcont.append(this.$bg_img);
		
		this.bgAligner = new MSAligner(that.fillMode , that.$imgcont, that.$bg_img );
		this.bgAligner.widthOnly = this.slider.options.autoHeight;
			
		if ( that.slider.options.autoHeight && (that.pselected || that.selected) ) {
			that.slider.setHeight(that.slider.options.height);
		}
		
		if ( this.$bg_img.data('src') !== undefined ) {
			this.bg_src = this.$bg_img.data('src');
			this.$bg_img.removeAttr('data-src');
		} else {
			this.$bg_img.one('load', function(event) {that._onBGLoad(event);})
						.each($.jqLoadFix);
		}
		
	};

	/**
	 * align and resize backgrund image over slide
	 */
	p.setupBG = function(){

		//if(this.isSettedup) return;
		//this.isSettedup = true;

		if ( !this.initBG && this.bgLoaded ) {
			this.initBG = true;
			this.$bg_img.css('visibility' , '');
			this.bgWidth  = this.bgNatrualWidth  || this.$bg_img.width();
			this.bgHeight = this.bgNatrualHeight || this.$bg_img.height();

			CTween.fadeIn(this.$imgcont , 300);	

			if(this.slider.options.autoHeight){
				this.$imgcont.height(this.bgHeight * this.ratio);
			}
			
			this.bgAligner.init(this.bgWidth  , this.bgHeight);
			this.setSize(this.__width , this.__height);
			
			if(this.slider.options.autoHeight && (this.pselected || this.selected))
			 	this.slider.setHeight(this.getHeight());
		}
		
	};


	
	/**
	 * start loading images
	 */
	p.loadImages = function(){
		if ( this.ls ) {
			return;
		}

		this.ls = true;
		
		if ( this.bgvideo ) {
			this.bgvideo.load();
		}
		if ( this.hasBG && this.bg_src ) {
			var that = this;
			this.$bg_img.preloadImg(this.bg_src , function(event) {that._onBGLoad(event);});
		}

		if ( this.hasLayers ) {
			this.layerController.loadLayers(this._onLayersLoad);
		}
		// There is nothing to preload? so slide is ready to show.
		if( !this.hasBG && !this.hasLayers ) {
			this.assetsLoaded();
		}

	};

	/**
	 * layerController on assets load callback
	 */
	p._onLayersLoad = function () {
		this.layersLoaded = true;
		if ( !this.hasBG || this.bgLoaded ) {
			this.assetsLoaded();
		}
	};
	/**
	 * on background image loaded 
	 * @param  {Event} event 
	 */
	p._onBGLoad = function(event){
		this.bgNatrualWidth = event.width;
		this.bgNatrualHeight = event.height;

		this.bgLoaded = true;
		
		if ( $.browser.msie ) {
			this.$bg_img.on('dragstart', function(event) { event.preventDefault(); }); // disables native dragging
		}
		
		if ( !this.hasLayers || this.layerController.ready ) {
			this.assetsLoaded();
		} 
	};

	/* -----------------------------------------------------*/

	/**
	 * add video background to the slide
	 * @param {jQuery Element} $video 
	 */
	p.setBGVideo = function($video){
		
		if ( !$video[0].play ) { 
			return;
		}

		// disables video in mobile devices
		if ( window._mobile ) {
			$video.remove();
			return;
		}

		this.bgvideo  = $video[0];
		var that = this;

		$video.addClass('ms-slide-bgvideo');
		
		if ( $video.data('loop') !== false ) {
			this.bgvideo.addEventListener('ended' , function(){
				//that.bgvideo.currentTime = -1;
				that.bgvideo.play();
			});
		}	

		if ( $video.data('mute') !== false ) {
			this.bgvideo.muted = true;
		}

		if ( $video.data('autopause') === true ) {
			this.autoPauseBgVid = true;
		}

		this.bgvideo_fillmode = $video.data('fill-mode') || 'fill'; // fill , fit , none
		
		if ( this.bgvideo_fillmode !== 'none' ) {
			this.bgVideoAligner = new MSAligner(this.bgvideo_fillmode , this.$element, $video );
			
			this.bgvideo.addEventListener('loadedmetadata' , function(){
				if(that.vinit) return;

				that.vinit = true;
				that.video_aspect = that.bgVideoAligner.baseHeight/that.bgVideoAligner.baseWidth;
				that.bgVideoAligner.init(that.bgvideo.videoWidth , that.bgvideo.videoHeight);
				that._alignBGVideo();
				CTween.fadeIn($(that.bgvideo) , 200);

				if ( that.selected ) {
					that.bgvideo.play();
				}
			});
		}

		$video.css('opacity' , 0);

		this.$bgvideocont = $('<div></div>').addClass('ms-slide-bgvideocont').append($video);

		if ( this.hasBG ) {
			this.$imgcont.before(this.$bgvideocont);
		} else {
			this.$bgvideocont.appendTo(this.$element);
		}
	};

	/**
	 * align video in slide
	 */
	p._alignBGVideo = function () {
		if ( !this.bgvideo_fillmode || this.bgvideo_fillmode === 'none' ) {
			return;
		}
		this.bgVideoAligner.align();
	};

	/* -----------------------------------------------------*/
	
	/**
	 * resize slide
	 * @param {Number} width  
	 * @param {Number} height 
	 * @param {Boolean} hard   after resizing reinitializes layers 
	 */
	p.setSize = function(width, height, hard) {

		this.__width  = width;
		
		if ( this.slider.options.autoHeight ) {
			if ( this.bgLoaded ) {
				this.ratio = this.__width / this.bgWidth;
				height = Math.floor(this.ratio * this.bgHeight);
				this.$imgcont.height(height);
			} else {
				this.ratio = width / this.slider.options.width;
				height = this.slider.options.height * this.ratio;
			}
		}
	
		this.__height = height;
		this.$element.width(width).height(height);

		if(this.hasBG && this.bgLoaded)this.bgAligner.align();
		
		this._alignBGVideo();

		if ( this.hasLayers ) {
			this.layerController.setSize(width, height, hard);
		}
	};

	/**
	 * calculates slide height
	 * @return {Number} slide height
	 */
	p.getHeight = function(){

		if ( this.hasBG && this.bgLoaded ) {
			return this.bgHeight * this.ratio;
		}

		return Math.max(this.$element[0].clientHeight, this.slider.options.height * this.ratio);
	};

	/* -----------------------------------------------------*/
	// YouTube and Vimeo videos	
	
	/**
	 * playe embeded video
	 */
	p.__playVideo = function (){

		if ( this.vplayed || this.videodis ) {
			return;
		}

		this.vplayed = true;

		if ( !this.slider.api.paused ) {
			this.slider.api.pause();
			this.roc = true; // resume on close;
		}

		this.vcbtn.css('display' , '');
		CTween.fadeOut(this.vpbtn 	, 500 , false);
		CTween.fadeIn(this.vcbtn 	, 500);
		CTween.fadeIn(this.vframe 	, 500);
		this.vframe.css('display' , 'block').attr('src' , this.video + '&autoplay=1');
		this.view.$element.addClass('ms-def-cursor');
		
		// remove perspective style from view if it's Firefox.
		// it fixes video fullscreen issue in Firefox
		if ( this.moz ) {
			this.view.$element.css('perspective', 'none');
		}

		// if swipe navigation enabled		
		if ( this.view.swipeControl ) {
			this.view.swipeControl.disable();
		}
		
		this.slider.slideController.dispatchEvent(new MSSliderEvent(MSSliderEvent.VIDEO_PLAY));
	};
	
	/**
	 * close embeded video 
	 */
	p.__closeVideo = function(){
		
		if ( !this.vplayed ) {
			return;
		}
		
		this.vplayed = false;

		if(this.roc){
			this.slider.api.resume();
		}

		var that = this;
		
		CTween.fadeIn(this.vpbtn	, 500);
		CTween.animate(this.vcbtn   , 500 , {opacity:0} , {complete:function(){	that.vcbtn.css  ('display'  , 'none'); }});
		CTween.animate(this.vframe  , 500 , {opacity:0} , {complete:function(){	that.vframe.attr('src'  , 'about:blank').css('display'  , 'none');}});
		
		//  video fullscreen issue in Firefox
		if ( this.moz ) {
			this.view.$element.css('perspective', '');
		}

		// if swipe navigation enabled		
		if ( this.view.swipeControl ) {
			this.view.swipeControl.enable();
		}
		
		this.view.$element.removeClass('ms-def-cursor');
		this.slider.slideController.dispatchEvent(new MSSliderEvent(MSSliderEvent.VIDEO_CLOSE));
	};

	/* -----------------------------------------------------*/

	/**
	 * create slide - it adds requierd elements over slide
	 */
	p.create = function(){
		var that = this;

		if ( this.hasLayers ) {			
			this.layerController.create();
		}
 
		if ( this.link ) {
			this.link.addClass('ms-slide-link').html('').click(function(e){
				if ( that.linkdis ) {
					e.preventDefault();
				}
			});

			// this.$element.css('cursor' , 'pointer')
			// 			 .click(function(){ if(!that.linkdis) window.open(that.link , that.link_targ || '_self'); });
		}
		
		if ( this.video ) {

			if ( this.video.indexOf('?') === -1 ) {
				this.video += '?';
			}

			this.vframe = $('<iframe></iframe>')
						  .addClass('ms-slide-video')
						  .css({width:'100%' , height:'100%' , display:'none'})
						  .attr('src' , 'about:blank')
						  .attr('allowfullscreen', 'true')
						  .appendTo(this.$element);
			
			this.vpbtn = $('<div></div>')
						.addClass('ms-slide-vpbtn')
						.click(function(){that.__playVideo();})
						.appendTo(this.$element);	
			
			this.vcbtn = $('<div></div>')
						.addClass('ms-slide-vcbtn')
						.click(function(){that.__closeVideo();})
						.appendTo(this.$element)
						.css('display','none');

			if ( window._touch ) {
				this.vcbtn.removeClass('ms-slide-vcbtn')
						  .addClass('ms-slide-vcbtn-mobile')
						  .append('<div class="ms-vcbtn-txt">Close video</div>')
						  .appendTo(this.view.$element.parent());
			}
		}	
		
		if ( !this.slider.options.autoHeight && this.hasBG ) {
			this.$imgcont.css('height' , '100%');
			
			if ( this.fillMode === 'center' || this.fillMode === 'stretch' ){
				this.fillMode = 'fill';		
			}
		}

		if ( this.slider.options.autoHeight ) { 
			this.$element.addClass('ms-slide-auto-height');
		}

		this.sleep(true);
	};
	
	/**
	 * destory the slide
	 */
	p.destroy = function(){
		if ( this.hasLayers ) {
			this.layerController.destroy();
			this.layerController = null;
		}
		this.$element.remove();
		this.$element = null;
	};
	
	/**
	 * everything require to do before selecting slide
	 */
	p.prepareToSelect = function(){

		if ( this.pselected || this.selected ) {
			return;
		}

		this.pselected = true;		
		
		if ( this.link || this.video ) {
			this.view.addEventListener(MSViewEvents.SWIPE_START  , this.onSwipeStart  , this);
			this.view.addEventListener(MSViewEvents.SWIPE_MOVE  , this.onSwipeMove  , this);
			this.view.addEventListener(MSViewEvents.SWIPE_CANCEL , this.onSwipeCancel , this);
			this.linkdis = false;
			this.swipeMoved = false;	
		}

		this.loadImages();

		if ( this.hasLayers ) {
			this.layerController.prepareToShow();
		}
		
		if ( this.ready ) {
			if( this.bgvideo ){
				this.bgvideo.play();
			}

			if ( this.hasLayers && this.slider.options.instantStartLayers ){
				this.layerController.showLayers();
			}
		}
		if( this.moz ){
			this.$element.css('margin-top' , '');
		}


	};
	
	/*p.prepareToUnselect = function(){
		if(!this.pselected || !this.selected) return;
		
		this.pselected = false;
		
	};*/
	
	/**
	 * select slide 
	 */
	p.select = function(){
		if ( this.selected ) {
			return;
		}

		this.selected = true;
		this.pselected = false;
		this.$element.addClass('ms-sl-selected');
		
		if(this.hasLayers){

			if ( this.slider.options.autoHeight ) {
				this.layerController.updateHeight();
			}
			
			if( !this.slider.options.instantStartLayers ) {
				this.layerController.showLayers();
			}

			//this.view.addEventListener(MSViewEvents.SCROLL 		, this.updateLayers  , this)
		} 	
		

		if( this.ready && this.bgvideo ) {
			this.bgvideo.play();
		}
		
		// @since 1.8.0 
		// Autoplay iframe video
		if ( this.videoAutoPlay ) {
			this.videodis = false;
			this.vpbtn.trigger('click');
		}

	};
	
	/**
	 * remove selected status   
	 */
	p.unselect = function(){
		this.pselected = false;

		if ( this.moz ) {
			this.$element.css('margin-top' , '0.1px');
		}

		if ( this.link || this.video ) {
			this.view.removeEventListener(MSViewEvents.SWIPE_START 	 , this.onSwipeStart  , this);
			this.view.removeEventListener(MSViewEvents.SWIPE_MOVE  , this.onSwipeMove  , this);
			this.view.removeEventListener(MSViewEvents.SWIPE_CANCEL  , this.onSwipeCancel , this);
		}

		if (this.bgvideo ) {
			this.bgvideo.pause();
			if(!this.autoPauseBgVid && this.vinit)
				this.bgvideo.currentTime = 0;
		}

		// hide layers
		if ( this.hasLayers ) {
			this.layerController.hideLayers();
		}
			
		if ( !this.selected ) {
			return;
		}

		this.selected = false;

		this.$element.removeClass('ms-sl-selected');		
		if(this.video && this.vplayed){
			this.__closeVideo();
			this.roc = false;
		}	
		
	};	

	/**
	 * remove slide from DOM
	 */
	p.sleep = function(force){
		if ( this.isSleeping && !force ) {
			return;
		}

		this.isSleeping = true;

		if ( this.autoAppend ) {
			this.$element.detach();
		}

		if ( this.hasLayers ) {
			this.layerController.onSlideSleep();
		}
	};
	
	/**
	 * add slide to the DOM
	 */
	p.wakeup = function(){
		if ( !this.isSleeping ) {
			return;
		}
		
		this.isSleeping = false;
		
		if ( this.autoAppend ) {
			this.view.$slideCont.append(this.$element);
		}

		if ( this.moz ){
			this.$element.css('margin-top' , '0.1px');
		}
		
		this.setupBG();

		// aling bg
		if ( this.hasBG ){
			this.bgAligner.align();
		}

		if ( this.hasLayers ) {
			this.layerController.onSlideWakeup();
		}
	};

})(window, document, jQuery);

/* ================== bin-debug/js/pro/controls/SlideController.js =================== */
;(function($){
	
	"use strict";
	
	var SliderViewList = {};
	
	window.MSSlideController = function(slider){
		
		this._delayProgress		= 0;
		
		this._timer 			= new averta.Timer(100);
		this._timer.onTimer 	= this.onTimer;
		this._timer.refrence 	= this;
		
		this.currentSlide		= null;
		
		this.slider 	= slider;
		this.so 		= slider.options;
		
		averta.EventDispatcher.call(this);
		
	};
	
	MSSlideController.registerView = function(name , _class){
		if(name in SliderViewList){
			 throw new Error( name + ', is already registered.');
			 return;
		}
		
		SliderViewList[name] = _class;
	};
	
	MSSlideController.SliderControlList = {};
	MSSlideController.registerControl = function(name , _class){
		if(name in MSSlideController.SliderControlList){
			 throw new Error( name + ', is already registered.');
			 return;
		}
		
		MSSlideController.SliderControlList[name] = _class;
	};	
	
	var p = MSSlideController.prototype;
	
	/*-------------- METHODS --------------*/
	

	p.setupView = function(){

		var that = this;
		this.resize_listener = function(){that.__resize();};
		
		// in @version 1.5.7 it will be added in Masterslider.js _setupSliderLayout function
		//$(window).bind('resize', this.resize_listener);
		
		//if(this.so.smoothHeight) this.so.autoHeight = true;
	
		var viewOptions = {
			spacing: 		this.so.space,
			mouseSwipe:		this.so.mouse,
			loop:			this.so.loop,
			autoHeight:		this.so.autoHeight,
			swipe:			this.so.swipe,
			speed:			this.so.speed,
			dir:			this.so.dir, 
			viewNum: 		this.so.inView,
			critMargin: 	this.so.critMargin
		};	
		
		if(this.so.viewOptions)
			$.extend(viewOptions , this.so.viewOptions);
				
		if(this.so.autoHeight) this.so.heightLimit = false;
	
		//this.view.slideDuration = this.so.duration;

		var viewClass = SliderViewList[this.slider.options.view] || MSBasicView;
		if(viewClass._3dreq && (!window._css3d || $.browser.msie) ) viewClass = viewClass._fallback || MSBasicView;
		
		this.view = new viewClass(viewOptions);

		if(this.so.overPause){
			var that = this;
			this.slider.$element.mouseenter(function(){
				that.is_over = true;
				that._stopTimer();
			}).mouseleave(function(){
				that.is_over = false;
				that._startTimer();
			});
		}
	};

	p.onChangeStart = function(){
		
		this.change_started = true;

		if(this.currentSlide) this.currentSlide.unselect();
		this.currentSlide = this.view.currentSlide;
		this.currentSlide.prepareToSelect();
		//this.__appendSlides();
		if(this.so.endPause && this.currentSlide.index === this.slider.slides.length - 1){
			this.pause();
			//this._timer.reset();
			this.skipTimer();
		}
		
		if(this.so.autoHeight){
			this.slider.setHeight(this.currentSlide.getHeight());
		}

		if ( this.so.deepLink ) {
			this.__updateWindowHash();
		}

		this.dispatchEvent(new MSSliderEvent(MSSliderEvent.CHANGE_START));
	};
	
	p.onChangeEnd = function(){
		//if(!this.currentSlide.selected)
		//	this._timer.reset();
		this.change_started = false;
		
		this._startTimer();
		this.currentSlide.select();
		
		if(this.so.preload > 1){
			var loc ,i , l = this.so.preload - 1, slide;
			
			// next slides
			for(i=1;i<=l;++i){
				loc = this.view.index + i;
				
				if(loc >= this.view.slideList.length) {
					if(this.so.loop){
						loc = loc - this.view.slideList.length;
					}else{
						i = l; 
						continue;
					}
				}

				slide = this.view.slideList[loc];
				if ( slide ) {
					slide.loadImages();
				}

			}
			
			// previous slides
			if(l > this.view.slideList.length/2) 
				l = Math.floor(this.view.slideList.length/2);
			
			for(i=1;i<=l;++i){
				
				loc = this.view.index - i;
				
				if(loc < 0){
					if(this.so.loop){
						loc = this.view.slideList.length + loc;
					}else{
						i = l;
						continue;
					}
				} 

				slide = this.view.slideList[loc];
				if ( slide ) {
					slide.loadImages();
				}
				
			}
		}
		
		this.dispatchEvent(new MSSliderEvent(MSSliderEvent.CHANGE_END));
		
	};
		
	p.onSwipeStart = function(){
		//this._timer.reset();
		this.skipTimer();
	};
	
	p.skipTimer = function(){
		this._timer.reset();
		this._delayProgress  = 0;
		this.dispatchEvent(new MSSliderEvent(MSSliderEvent.WAITING));
	};

	p.onTimer = function(time) {
		
		if(this._timer.getTime() >= this.view.currentSlide.delay * 1000){
			//this._timer.reset();
			this.skipTimer();
			this.view.next();
			this.hideCalled = false;
		}
		this._delayProgress = this._timer.getTime() / (this.view.currentSlide.delay * 10);
		
		if(this.so.hideLayers && !this.hideCalled && this.view.currentSlide.delay * 1000 - this._timer.getTime() <= 300){
			var currentSlide = this.view.currentSlide;
			if ( currentSlide.hasLayers ) {
				currentSlide.layerController.animHideLayers();
			}
			this.hideCalled = true;
		}
		
		this.dispatchEvent(new MSSliderEvent(MSSliderEvent.WAITING));
	};
	
	p._stopTimer = function(){
		if(this._timer)
			this._timer.stop();
	};
	
	p._startTimer = function(){
		if(!this.paused && !this.is_over && this.currentSlide && this.currentSlide.ready && !this.change_started)
			this._timer.start();
	};

	p.__appendSlides = function(){
		var slide , loc , i = 0 , l = this.view.slideList.length -1;

		// detach all
		for ( i ; i < l ; ++i){
			slide = this.view.slideList[i];
			if(!slide.detached){
			 	slide.$element.detach();
			 	slide.detached = true;
			}
		}

		// append current slide
		this.view.appendSlide(this.view.slideList[this.view.index]);

		l = 3;

		// next slides
		for(i=1;i<=l;++i){
			loc = this.view.index + i;
			
			if(loc >= this.view.slideList.length) {
				if(this.so.loop){
					loc = loc - this.view.slideList.length;
				}else{
					i = l; 
					continue;
				}
			}

			slide = this.view.slideList[loc];
			slide.detached = false;
			this.view.appendSlide(slide);

		}
		
		// previous slides
		if(l > this.view.slideList.length/2) 
			l = Math.floor(this.view.slideList.length/2);
		
		for(i=1;i<=l;++i){
			
			loc = this.view.index - i;
			
			if(loc < 0){
				if(this.so.loop){
					loc = this.view.slideList.length + loc;
				}else{
					i = l;
					continue;
				}
			} 
			
			slide = this.view.slideList[loc];
			slide.detached = false;
			this.view.appendSlide(slide);
		}

	}

	p.__resize = function(hard){
		if(!this.created) return;

		this.width = this.slider.$element[0].clientWidth || this.so.width;
		
		if(!this.so.fullwidth){ 
			this.width = Math.min(this.width , this.so.width);
			//this.view.$element.css('left' , (this.slider.$element[0].clientWidth - this.width) / 2 + 'px');
		}

		if( this.so.fullheight ){
			this.so.heightLimit = false;
			this.so.autoHeight = false;
			this.height = this.slider.$element[0].clientHeight;
		} else {
			this.height = this.width / this.slider.aspect;
		}
		if( this.so.autoHeight ){
			this.currentSlide.setSize(this.width , null , hard);
			this.view.setSize(this.width , this.currentSlide.getHeight() , hard);
		} else {
			this.view.setSize(this.width , ( Math.max( this.so.minHeight, ( this.so.heightLimit ? Math.min(this.height , this.so.height) :  this.height ) ) ) , hard);
		}
		
		if(this.slider.$controlsCont){
			if(this.so.centerControls && this.so.fullwidth) {
				this.view.$element.css('left' , Math.min(0,-(this.slider.$element[0].clientWidth - this.so.width) / 2) + 'px');
			}
		}
		
		this.dispatchEvent(new MSSliderEvent(MSSliderEvent.RESIZE));
	};

	p.__dispatchInit = function(){
		this.dispatchEvent(new MSSliderEvent(MSSliderEvent.INIT));
	};

	/**
	 * used by deep link feature, uptades window hash value on slide changes 
	 * @since 2.1.0
	 */
	p.__updateWindowHash = function(){
		var hash = window.location.hash,
			dl = this.so.deepLink,
			dlt = this.so.deepLinkType,
			eq = dlt === 'path' ? '\/' : '=',
			sep = dlt === 'path' ? '\/' : '&',
			sliderHash = dl + eq + (this.view.index + 1),
			regTest = new RegExp( dl + eq + '[0-9]+', 'g');

		if ( hash === '' ) {
			window.location.hash = sep + sliderHash;
		} else if( regTest.test(hash) ) {
			window.location.hash = hash.replace(regTest, sliderHash);
		} else {
			window.location.hash = hash + sep + sliderHash;
		}
	};

	p.__curentSlideInHash = function(){
		var hash = window.location.hash,
			dl = this.so.deepLink,
			dlt = this.so.deepLinkType,
			eq = dlt === 'path' ? '\/' : '=',
			regTest = new RegExp( dl + eq + '[0-9]+', 'g' );

		if ( regTest.test(hash) ) {
			var index = Number(hash.match(regTest)[0].match(/[0-9]+/g).pop());
			if ( !isNaN(index) ) {
				return index - 1;
			}
		}

		return -1;
	};

	p.__onHashChanged = function(){
		var index = this.__curentSlideInHash();
		if ( index !== -1 ){
			this.gotoSlide(index);
		}
	};
	
	p.setup = function(){
		
		this.created = true;
		this.paused = !this.so.autoplay;

		//this.slider.$element.append(this.view.$element);
		this.view.addEventListener(MSViewEvents.CHANGE_START , this.onChangeStart , this);
		this.view.addEventListener(MSViewEvents.CHANGE_END   , this.onChangeEnd   , this);
		this.view.addEventListener(MSViewEvents.SWIPE_START  , this.onSwipeStart  , this);	
		
		//this.currentSlide = this.view.slides[this.so.start - 1];
		this.currentSlide = this.view.slideList[this.so.start - 1];
		this.__resize();

		var slideInHash = this.__curentSlideInHash(),
			startSlide = slideInHash !== -1 ? slideInHash : this.so.start - 1;
		this.view.create(startSlide);
		
		if(this.so.preload === 0){
			this.view.slideList[0].loadImages();
		}
			
		this.scroller = this.view.controller;

		if(this.so.wheel){
			var that = this;
			var last_time = new Date().getTime();
			this.wheellistener = function(event){
				
				var e = window.event || event.orginalEvent || event;
				e.preventDefault();
				
				var current_time = new Date().getTime();
				if(current_time - last_time < 400) return;
				last_time = current_time;
				
				var delta = Math.abs(e.detail || e.wheelDelta);
				
				if ( $.browser.mozilla ) {
					delta *= 100;
				}

				var scrollThreshold = 15; 
				
				// --- Scrolling up ---
				if (e.detail < 0 || e.wheelDelta > 0) {
					if ( delta >= scrollThreshold) {
						that.previous(true);
					}
				}
				// --- Scrolling down ---
				else {
					if (delta >= scrollThreshold) {
						that.next(true);
					}
				}

				return false;
			};
			
			if($.browser.mozilla) this.slider.$element[0].addEventListener('DOMMouseScroll' , this.wheellistener);
			else this.slider.$element.bind('mousewheel', this.wheellistener);
		}

		// if(this.so.wheel){
		// 	var that = this;
		// 	var last_time = new Date().getTime();
		// 	this.wheellistener = function(event){
		// 		var current_time = new Date().getTime();
		// 		if(current_time - last_time < 550) return;
		// 		last_time = current_time;
		// 		var e = window.event || event.orginalEvent || event;
		// 		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		// 		if(delta < 0)		that.next();
		// 		else if(delta > 0)	that.previous();
		// 		return false;
		// 	};
			
		// 	if($.browser.mozilla) this.slider.$element[0].addEventListener('DOMMouseScroll' , this.wheellistener);
		// 	else this.slider.$element.bind('mousewheel', this.wheellistener);
		// }

		if(this.slider.$element[0].clientWidth === 0)
			this.slider.init_safemode = true;

		this.__resize();

		var that = this;
		if( this.so.deepLink ) {
			$(window).on('hashchange', function() {
			  that.__onHashChanged();
			});
		}
	};
	
	p.index = function(){
		return this.view.index;
	};
	
	p.count = function(){
		return this.view.slidesCount;
	};
	
	p.next = function(checkLoop){
		this.skipTimer();
		this.view.next(checkLoop);
	};
	
	p.previous = function(checkLoop){
		this.skipTimer();
		this.view.previous(checkLoop);
	};
	
	p.gotoSlide = function(index) {
		index = Math.min(index, this.count()-1);
		this.skipTimer();
		this.view.gotoSlide(index);
	};

	p.destroy = function(reset){
		this.dispatchEvent(new MSSliderEvent(MSSliderEvent.DESTROY));
		this.slider.destroy(reset);
	};

	p._destroy = function(){
		this._timer.reset();
		this._timer = null;
		
		$(window).unbind('resize', this.resize_listener);
		this.view.destroy();
		this.view = null;
		
		if(this.so.wheel){
			if($.browser.mozilla) this.slider.$element[0].removeEventListener('DOMMouseScroll' , this.wheellistener);
			else this.slider.$element.unbind('mousewheel', this.wheellistener);
			this.wheellistener = null;
		}
			
		this.so = null;
	};

	/**
	 * run layer actions like next, previous,...
	 * @param  {String} action
	 * @since v1.7.2 
	 */
	p.runAction = function(action){
		var actionParams = [];

		if( action.indexOf('(') !== -1 ){
			var temp = action.slice(0 , action.indexOf('('));			
			actionParams = action.slice(action.indexOf('(') + 1 , -1).replace(/\"|\'|\s/g , '').split(',');
			action   = temp;
		}

		if ( action in this ){
			this[action].apply(this, actionParams);
		} else if ( console ){
			console.log('Master Slider Error: Action "'+action+'" not found.');
		}
	};

	p.update = function(hard){
		if(this.slider.init_safemode && hard)
			this.slider.init_safemode = false;
		this.__resize(hard);

		if ( hard ) { 
			this.dispatchEvent(new MSSliderEvent(MSSliderEvent.HARD_UPDATE));
		}

	};
		
	p.locate = function(){
		this.__resize();
	};
	
	p.resume = function(){
		if(!this.paused) return;
		this.paused = false;
		this._startTimer();
	};
	
	p.pause = function(){
		if(this.paused) return;
		this.paused = true;
		this._stopTimer();
	};

	p.currentTime = function(){
		return this._delayProgress;
	};
	
	averta.EventDispatcher.extend(p);
})(jQuery);

/* ================== bin-debug/js/pro/MasterSlider.js =================== */
/**
 * Master Slider Main JavaScript File
 */

;(function($){
	
	"use strict";

	var LayerTypes = {
		'image' 	: MSImageLayerElement,
		'text'  	: MSLayerElement,
		'video' 	: MSVideoLayerElement,
		'hotspot'	: MSHotspotLayer,
		'button'	: MSButtonLayer
	};
	window.MasterSlider = function(){
		
		// Default Options
		this.options = {
			autoplay 			: false,      // Enables the autoplay slideshow.
			loop 				: false,	  // Enables the continuous sliding mode.
			mouse				: true,		  // Whether the user can use mouse drag navigation.
			swipe				: true,		  // Whether the drag/swipe navigation is enabled.
			grabCursor			: true,		  // Whether the slider uses grab mouse cursor.
			space  				: 0,		  // The spacing value between slides in pixels.
			fillMode			: 'fill',  	  // Specifies the slide background scaling method. Its acceptable values are "fill", "fit", "stretch", "center" and "tile". 
			start				: 1,		  // The slider starting slide number.
			view				: 'basic',	  // The slide changing transition. 
			width				: 300,		  // The base width of slides. It helps the slider to resize in correct ratio.
			height				: 150,		  // The base height of slides, It helps the slider to resize in correct ratio.
			inView				: 15, 		  // Specifies number of slides which will be added at a same time in DOM.
			critMargin			: 1,		  // 
			heightLimit			: true,		  // It force the slide to use max height value as its base specified height value.
			smoothHeight		: true,		  // Whether the slider uses smooth animation while its height changes.
			autoHeight			: false,      // Whether the slider adapts its height to each slide height or not. It overrides heightLimit option.
			minHeight 			: -1,		  // @since 2.13.0, Specifies min height value for the slider, it prevents slider to shows too narrow in small screens.
			fullwidth			: false,	  // It enables the slider to adapt width to its parent element. It's very useful for creating full-width sliders. In default it takes max width as its base width value.
			fullheight			: false,	  // It enables the slider to adapt height to its parent element.
			autofill			: false,	  // It enables the slider to adapt width and height to its parent element, It's very useful for creating fullscreen or fullwindow slider.
			layersMode			: 'center',	  // It accepts two values "center" and "full". The "center" value indicates that the slider aligns layers to the center. This option is only effective in full width mode.
			hideLayers			: false,	  // Whether the slider hides all layers before changing slide.
			endPause			: false,	  // Whether the slider pauses slideshow when it stays at the last slide.
			centerControls 		: true,		  // Whether the slider aligns UI controls to center. This option is only effective in full width mode.
			overPause			: true,		  // Whether the slider pauses slideshow on hover.
			shuffle				: false,	  // Enables the shuffle slide order.
			speed				: 17, 		  // Specifies slide changing speed. It accepts float values between 0 and 100.
			dir					: 'h',		  // Specifies slide changing direction. It accepts two values "h" (horizontal) and "v" (vertical).
			preload				: 0,		  // Specifies number of slides which will be loaded by slider. 0 value means the slider loads slides in sequence.
			wheel				: false,	  // Whether slider uses mouse wheel for navigation.
			layout				: 'boxed',	  // It accepts 'fullwidth', 'fullscreen', 'fillwidth', 'autofill', 'partialview', 'boxed'. It overrides 'fullwidth' and 'autofill' (added in v1.5.6)
			autofillTarget 		: null,		  // @since 2.13.0, Specifies the parent element of slider width jQuery selector, it used for sizing slider with autofill layout. Default value is the first parent element of slider.
			fullscreenMargin	: 0,		  // Specifies margin amount to the bottom of slider, it's only effective on fullscreen slider.
			instantStartLayers	: false, 	  // @since 1.5.0, Whether instantly shows slide layers.
			parallaxMode 		: 'mouse',	  // @since 1.6.0, Specifies mode of parallax effect accepts: "mouse", "mouse:x-only", "mouse:y-only" and "swipe"
			rtl 				: false,	  // @since 1.8.0, Whether Right-to-left direction slider.
			deepLink			: null,       // @since 2.1.0, null value disables slider deep-linking any string values identifies the slider in page's url like /#msslider-1
			deepLinkType 		: 'path', 	  // @since 2.1.0, type of hash value in page's url possible values, path and query (  #gallery/1 || #gallery=4 )
			disablePlugins      : []		  // @since 2.9.6, list of disabled Master Slider plugin names for this instance.
		};
		
		this.slides = [];
		this.activePlugins = [];	
		this.$element = null;

		// used by new layout method. to force fullwidth or fullscreen
		this.lastMargin = 0; 

		// Reserved side spaces of slider
		this.leftSpace = 0;
		this.topSpace = 0;
		this.rightSpace = 0;
		this.bottomSpace = 0;

		// hold on stack
		this._holdOn = 0;

		var that = this;
		this.resize_listener = function(){that._resize();};
		$(window).bind('resize', this.resize_listener);
				
	};
	
	MasterSlider.author  		= 'Averta Ltd. (www.averta.net)';
	MasterSlider.version 		= '2.15.1';
	MasterSlider.releaseDate 	= 'Jul 2015';
	
	// Master Slider plugins.
	MasterSlider._plugins = []
	var MS = MasterSlider;
	MS.registerPlugin = function ( plugin ) {
		if ( MS._plugins.indexOf(plugin) === -1 ) {
			MS._plugins.push(plugin);
		}
	};

	var p = MasterSlider.prototype;
	
	/*-------------- METHODS --------------*/

	/**
	 * create one slide object for each slide and add it to slide controller
	 * @since 1.0
	 * @private
	 */
	p.__setupSlides = function(){
		var that = this,
			new_slide,
			ind = 0;

		this.$element.children('.ms-slide').each(function(index) {
			
			var $slide_ele = $(this);
			
			new_slide 			= new MSSlide();
			new_slide.$element 	= $slide_ele;
			new_slide.slider 	= that;
			new_slide.delay  	= $slide_ele.data('delay') 		!== undefined ? $slide_ele.data('delay') 		: 3;
			new_slide.fillMode 	= $slide_ele.data('fill-mode')	!== undefined ? $slide_ele.data('fill-mode') 	: that.options.fillMode;
			new_slide.index 	= ind++;

			// Slide Background Image
			var slide_img = $slide_ele.children('img:not(.ms-layer)');
			if( slide_img.length > 0 ){
				new_slide.setBG(slide_img[0]);
			}
			
			// Slide Video Background
			var slide_video = $slide_ele.children('video');
			if( slide_video.length > 0 ) new_slide.setBGVideo(slide_video);
			// controls
			if(that.controls){
				for(var i = 0 , l = that.controls.length; i<l ; ++i)
					that.controls[i].slideAction(new_slide);
			}
			
			// Slide Link and Video
			var slide_link = $slide_ele.children('a').each(function(index) {
			  var $this = $(this);
			  if(this.getAttribute('data-type') === 'video'){
				new_slide.video = this.getAttribute('href');

				new_slide.videoAutoPlay = $this.data('autoplay');
				
				$this.remove();
			  }else if(!$this.hasClass('ms-layer')) {
				new_slide.link  = $(this);
				//new_slide.link_targ = this.getAttribute('target');
				//$this.remove();
			  }
			});//.remove();
			
			// Slide Layers
			that.__createSlideLayers(new_slide , $slide_ele.find('.ms-layer'));
			that.slides.push(new_slide);
			that.slideController.view.addSlide(new_slide);

		});
	};
	
	/**
	 * Creates layers of specified layer
	 * @param  {MSSlide} slide  
	 * @param  {Array} layers
	 * @since 1.0
	 * @private
	 */
	p.__createSlideLayers = function(slide , layers) {
		if(layers.length == 0) return;
		slide.setupLayerController();

		layers.each(function(index , domEle){
			var $layer_element = $(this),
				$parent_ele;
			
			if( domEle.nodeName === 'A' && $layer_element.find('>img').data('type') === 'image' ) {
				$parent_ele = $(this);
				$layer_element = $parent_ele.find('img');
			}
			
			var layer = new (LayerTypes[$layer_element.data('type') || 'text']) ();
			layer.$element = $layer_element;
			layer.link = $parent_ele;
			
			var eff_parameters = {},
				end_eff_parameters = {};
		
			if($layer_element.data('effect') 	!== undefined)		eff_parameters.name 			= $layer_element.data('effect');
			if($layer_element.data('ease')		!== undefined) 		eff_parameters.ease 			= $layer_element.data('ease');
			if($layer_element.data('duration')  !== undefined)  	eff_parameters.duration 		= $layer_element.data('duration');
			if($layer_element.data('delay')   	!== undefined)   	eff_parameters.delay			= $layer_element.data('delay');

			if($layer_element.data('hide-effect'))		    		end_eff_parameters.name 		= $layer_element.data('hide-effect');
			if($layer_element.data('hide-ease'))		   			end_eff_parameters.ease 		= $layer_element.data('hide-ease');
			if($layer_element.data('hide-duration') !== undefined)  end_eff_parameters.duration		= $layer_element.data('hide-duration');
			if($layer_element.data('hide-time') 	!== undefined)  end_eff_parameters.time 		= $layer_element.data('hide-time');

			layer.setStartAnim(eff_parameters);
			layer.setEndAnim(end_eff_parameters);
			
			slide.layerController.addLayer(layer);
			
		});
		
	};
	
	/**
	 * remove slider initialize loading
	 * @since 1.0
	 * @private
	 */
	p._removeLoading = function(){
		$(window).unbind('resize', this.resize_listener);
		this.$element.removeClass('before-init')
					.css('visibility', 'visible')
					.css('height','')
					.css('opacity' , 0);
		CTween.fadeIn(this.$element);
		this.$loading.remove();

		if(this.slideController)
			this.slideController.__resize();
	};
	
	/**
	 * resize listener, it only used for aligning slider loading and after slider init it will be removed
	 * @param  {Event} e
	 * @since 1.0
	 * @private
	 */
	p._resize = function(e){
		if(this.$loading){
			var h = this.$loading[0].clientWidth / this.aspect;
			h = this.options.heightLimit ? Math.min(h , this.options.height) : h;
			
			this.$loading.height(h);
			this.$element.height(h);		
		}
	};
	
	/**
	 * changes the order of slides element before setup slides
	 * @since 1.0
	 * @private
	 */
	p._shuffleSlides = function(){
		var slides = this.$element.children('.ms-slide') , r;

		for(var i = 0 , l = slides.length; i < l ; ++i){
			r = Math.floor(Math.random() * (l - 1));
			if(i != r){
				this.$element[0].insertBefore(slides[i] , slides[r]);
				slides = this.$element.children('.ms-slide');
			}
		}
	};

	/**
	 * New method of setting up the layout of slider
	 * @since 1.5.6 
	 */
	p._setupSliderLayout = function(){

		// create side spaces
		this._updateSideMargins();
		this.lastMargin = this.leftSpace;
		
		var lo = this.options.layout;

	
		if( lo !== 'boxed' && lo !== 'partialview' ){
			this.options.fullwidth = true;  // enable slider fullscreen for fullwidth, fillwidth, autofill and fullscreen layouts.
		} 
		if( lo === 'fullscreen' || lo === 'autofill' ){
			this.options.fullheight = true;

			if ( lo === 'autofill' ) {
				this.$autofillTarget = $(this.options.autofillTarget);
				if ( this.$autofillTarget.length === 0 ) {
					this.$autofillTarget = this.$element.parent();
				}
			}

		}

		// partial view 
		if ( lo === 'partialview' ){
			this.$element.addClass('ms-layout-partialview');
		}
		if( lo === 'fullscreen' ||  lo === 'fullwidth' || lo === 'autofill' ){
			$(window).bind('resize', {that:this}, this._updateLayout);
			this._updateLayout();
		}

		// bind resize handler of slidecontroller __resize 
		$(window).bind('resize', this.slideController.resize_listener);
	};

	/**
	 * updates layout of slider based on window size
	 * @param  {Event} event
	 * @since 1.5.6
	 */
	p._updateLayout = function(event){
		var that = event? event.data.that : this,
			lo = that.options.layout,
			$element = that.$element,
			$win = $(window);

		// height
		if( lo === 'fullscreen' ){
			document.body.style.overflow = 'hidden';
			$element.height( $win.height() - that.options.fullscreenMargin - that.topSpace - that.bottomSpace);
			document.body.style.overflow = '';
		} else if ( lo === 'autofill' ) {
			$element.height(that.$autofillTarget.height() - that.options.fullscreenMargin - that.topSpace - that.bottomSpace)
					.width(that.$autofillTarget.width() - that.leftSpace - that.rightSpace);
			return;
		}
		// width 
		$element.width($win.width() - that.leftSpace - that.rightSpace);
		var margin = -$element.offset().left + that.leftSpace + that.lastMargin;
		$element.css('margin-left', margin );
		that.lastMargin = margin;
//
	};


	/**
	 * initialize the slider, called by document ready
	 * <code>holdOn</code> property prevents auto initialize slider after document ready it used by plugins of slider like Flickr
	 * @since 1.0
	 * @protected
	 */
	p._init = function(){
	
		if ( this._holdOn > 0 || !this._docReady ) {
			return;
		}
		
		this.initialized = true;

		if(this.options.preload !== 'all'){
			this._removeLoading();
		}
		//else
		//	this.$element.css('width' , this.$loading[0].clientWidth);
		
		if(this.options.shuffle) 	this._shuffleSlides();

		MSLayerEffects.setup();
		this.slideController.setupView();
		this.view = this.slideController.view;
				
		this.$controlsCont = $('<div></div>').addClass('ms-inner-controls-cont');//.appendTo(this.$element);
		if(this.options.centerControls){
			this.$controlsCont.css('max-width' , '1400px');
		}

		this.$controlsCont.prepend(this.view.$element);

		this.$msContainer = $('<div></div>').addClass('ms-container').prependTo(this.$element).append(this.$controlsCont);
		
		if(this.controls){
			for(var i = 0 , l = this.controls.length; i<l ; ++i){
				this.controls[i].setup();
			}
		}	
		/*else{
			this.$element.append(this.view.$element);
		}*/

		this._setupSliderLayout();
		this.__setupSlides();
		this.slideController.setup();
		
		if(this.controls){
			for(i = 0 , l = this.controls.length; i<l ; ++i)
				this.controls[i].create();
		}
			
		if(this.options.autoHeight){
			this.slideController.view.$element.height(this.slideController.currentSlide.getHeight());
		}
			
		// add grab cursor
		if(this.options.swipe && !window._touch && this.options.grabCursor && this.options.mouse){
			var $view = this.view.$element;
			
			$view.mousedown(function(){
				$view.removeClass('ms-grab-cursor');
				$view.addClass('ms-grabbing-cursor');

				if ( $.browser.msie && window.ms_grabbing_curosr ) {
					$view[0].style.cursor = 'url(' + window.ms_grabbing_curosr + '), move';
				}

			}).addClass('ms-grab-cursor');
			
			$(document).mouseup(function(){
				$view.removeClass('ms-grabbing-cursor');
				$view.addClass('ms-grab-cursor');

				if ( $.browser.msie && window.ms_grab_curosr ) {
					$view[0].style.cursor = 'url(' + window.ms_grab_curosr + '), move';
				}

			});
		}

		this.slideController.__dispatchInit();
	};
	
	/**
	 * changes the height of slider, it used in autoheight slider
	 * @param {Number} value
	 * @since 1.0
	 * @public
	 */
	p.setHeight = function(value){
		if(this.options.smoothHeight){
			if(this.htween){
				if(this.htween.reset)this.htween.reset();
				else	 			 this.htween.stop(true);
			} 
			this.htween = CTween.animate(this.slideController.view.$element , 500 , {height:value} , {ease:'easeOutQuart'});
		}else
			this.slideController.view.$element.height(value);
	};
	
	/**
	 * reserves white space in sides of slider, it used by controls
	 * @param  {String} side  left|right|top|bottom
	 * @param  {Number} space 
	 * @returns {Number} start position in space.
	 * @since 1.5.7
	 * @public
	 */
	p.reserveSpace = function(side, space){
		var sideSpace = side+'Space',
			pos = this[sideSpace];

		this[sideSpace] += space;
		
		this._updateSideMargins();

		return pos;
	};

	/**
	 * returns the reserved space, it used by controls and called when aligned control hides
	 * @param  {String} side  
	 * @param  {Number} space 
	 * @since 1.5.7
	 * @public 
	 */
	/*p.returnSpace = function(side, space){
		var sideSpace = side+'Space';
		this[sideSpace] = Math.max(0 , this[sideSpace] - space);

		this.api.dispatchEvent(new MSSliderEvent(MSSliderEvent.RESERVED_SPACE_CHANGE));
		this._updateSideMargins();
	};*/

	p._updateSideMargins = function(){
		this.$element.css('margin', this.topSpace + 'px ' + this.rightSpace + 'px ' + this.bottomSpace + 'px ' + this.leftSpace + 'px');
	}

	p._realignControls = function(){
		this.rightSpace = this.leftSpace = this.topSpace = this.bottomSpace = 0;
		this._updateSideMargins();
		this.api.dispatchEvent(new MSSliderEvent(MSSliderEvent.RESERVED_SPACE_CHANGE));
	};

	/*------------------------- Public Methods -----------------------*/

	/**
	 * Adds new control to the slider
	 * @param  {String} control
	 * @param  {Object} options [description]
	 * @since 1.0
	 * @public
	 */
	p.control = function(control , options){
		if(!(control in MSSlideController.SliderControlList)) return;
		if(!this.controls) this.controls = [];
		var ins = new MSSlideController.SliderControlList[control](options);
		ins.slider = this;
		this.controls.push(ins);
		
		return this;
	};

	/**
	 * Hold on slider from initialization
	 * @since 2.9.6
	 * @public
	 */
	p.holdOn = function () {
		this._holdOn ++;
	};

	/**
	 * Let the slider to initialize 
	 * @since 2.9.6
	 */
	p.release = function () { 
		this._holdOn --;
		this._init();
	};

	/**
	 * setup slider
	 * @param  {String|jQuery object} id
	 * @param  {Object} options 
	 * @since 1.0
	 * @public
	 */
	p.setup = function(target , options){
		if(typeof target === 'string'){
			this.$element = $('#' + target);
		} else {
			this.$element = target.eq(0);
		}

		//create a copy from slider markup, it will be used in destroy method.
		this.setupMarkup = this.$element.html();

		if( this.$element.length === 0 ){
			//if(console) console.log('Master Slider Error: #'+id+' not found.');
			return;
		}

		this.$element.addClass('master-slider').addClass('before-init');

		// IE prefix class
		// add browser prefix class name
		if($.browser.msie){
			this.$element.addClass('ms-ie')
						 .addClass('ms-ie' + $.browser.version.slice(0 , $.browser.version.indexOf('.')));
		} else if ( $.browser.webkit ) {
			this.$element.addClass('ms-wk');
		} else if ( $.browser.mozilla ) { 
			this.$element.addClass('ms-moz');
		}

		
		// Android prefix class
		var ua = navigator.userAgent.toLowerCase();
		var isAndroid = ua.indexOf("android") > -1;
		if(isAndroid) {
		  this.$element.addClass('ms-android');
		}

		var that = this;
		$.extend(this.options, options);
		
		this.aspect = this.options.width / this.options.height;
		
		this.$loading = $('<div></div>').
						addClass('ms-loading-container').
						insertBefore(this.$element).
						append($('<div></div>').addClass('ms-loading'));

		this.$loading.parent().css('position' , 'relative');
				
		// old methods 
		if(this.options.autofill){
			this.options.fullwidth = true;
			this.options.fullheight = true;
		}
		
		if(this.options.fullheight){
			this.$element.addClass('ms-fullheight');
		}

		//this._setupSliderLayout();	
		this._resize();
		
		// define slide controller and api
		this.slideController = new MSSlideController(this);
		this.api = this.slideController;

		// setup plugins
		for ( var i = 0, l = MS._plugins.length; i !== l; i++ ) {
			var plugin = MS._plugins[i];

			if ( this.options.disablePlugins.indexOf(plugin.name) === -1 ) {
				this.activePlugins.push(new plugin(this));
			}
		}

		$(document).ready(function(){
			that._docReady = true;
			that._init();
		});

		return this;
	};
	
	/**
	 * destroy the slider instance 
	 * @param  {Boolean} insertMarkup	 whether add slider markup after destroy.
	 * @since 1.4
	 * @public
	 */
	p.destroy = function(insertMarkup){
		
		// destroy active plugins
		for ( var i = 0, l = this.activePlugins.length; i !== l; i++ ) {
			this.activePlugins[i].destroy();
		}

		if(this.controls){
			for( i = 0, l = this.controls.length; i !== l; i++ )
				this.controls[i].destroy();
		}
		
		if(this.slideController) this.slideController._destroy();

		if(this.$loading) this.$loading.remove();

		if ( insertMarkup ) {
			this.$element.html(this.setupMarkup).css('visibility' , 'hidden');
		} else {	 
			this.$element.remove();
		}

		var lo = this.options.layout;
		if( lo === 'fullscreen' ||  lo === 'fullwidth' ){
			$(window).unbind('resize', this._updateLayout);
		}

		this.view = null;
		this.slides = null;
		this.options = null;
		this.slideController = null;
		this.api = null;
		this.resize_listener = null;


		this.activePlugins = null;
	};
		
})(jQuery);

/**
 * Master Slider jQuery Plugin
 * @author Averta
 */
(function ( $, window, document, undefined ) {

		var pluginName = "masterslider",
			defaults = {
				controls:{}
			};

		function MasterSliderPlugin ( element, options ) {
			this.element = element;
			this.$element = $(element);
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		$.extend(MasterSliderPlugin.prototype, {
			init : function () {

				var self = this;
				
				// create new instance form Master Slider	
				this._slider = new MasterSlider();

				// add controls
				for ( var control in this.settings.controls ){
					this._slider.control(control, this.settings.controls[control]);
				}

				this._slider.setup(this.$element, this.settings);

				// override api eventdisaptcher method
				var _superDispatch = this._slider.api.dispatchEvent;
				this._slider.api.dispatchEvent = function(event){
					self.$element.trigger(event.type);
					_superDispatch.call(this, event);
				};

			},

			api : function() { 
				return this._slider.api; 
			},
			
			slider : function() {
				return this._slider;
			}
		
		});

		$.fn[pluginName] = function ( options ) {
			var args = arguments,
				plugin = 'plugin_' + pluginName;

			// Is the first parameter an object (options), or was omitted,
			// instantiate a new instance of the plugin.
			if (options === undefined || typeof options === 'object') {
				return this.each(function () {

					// Only allow the plugin to be instantiated once,
					// so we check that the element has no plugin instantiation yet
					if (!$.data(this, plugin)) {
						$.data(this, plugin, new MasterSliderPlugin( this, options ));
					}
				});

			// If the first parameter is a string and it doesn't start
			// with an underscore or "contains" the `init`-function,
			// treat this as a call to a public method.
			} else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

				// Cache the method call
				// to make it possible
				// to return a value
				var returns;

				this.each(function () {
					var instance = $.data(this, plugin);

					// Tests that there's already a plugin-instance
					// and checks that the requested public method exists
					if (instance instanceof MasterSliderPlugin && typeof instance[options] === 'function') {

						// Call the method of our plugin instance,
						// and pass it the supplied arguments.
						returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
					} 

					// Map slider api functions to slider jq plugin
					if ( instance instanceof MasterSliderPlugin && typeof instance._slider.api[options] === 'function' ) {
						returns = instance._slider.api[options].apply( instance._slider.api, Array.prototype.slice.call( args, 1 ) );
					}

					// Allow instances to be destroyed via the 'destroy' method
					if (options === 'destroy') {
					  $.data(this, plugin, null);
					}
				});

				// If the earlier cached method
				// gives a value back return the value,
				// otherwise return this to preserve chainability.
				return returns !== undefined ? returns : this;
			}
		};

})( jQuery, window, document );

/* ================== bin-debug/js/pro/views/ViewEvents.js =================== */
window.MSViewEvents = function (type, data){
	this.type = type;
	this.data = data;
};

MSViewEvents.SWIPE_START      	= 'swipeStart';
MSViewEvents.SWIPE_END       	= 'swipeEnd';
MSViewEvents.SWIPE_MOVE			= 'swipeMove';
MSViewEvents.SWIPE_CANCEL   	= 'swipeCancel';
MSViewEvents.SCROLL 			= 'scroll';
MSViewEvents.CHANGE_START   	= 'slideChangeStart';
MSViewEvents.CHANGE_END	     	= 'slideChangeEnd';

/* ================== bin-debug/js/pro/views/BasicView.js =================== */
;(function($){
	
	"use strict";
	
	window.MSBasicView = function(options){
		
		this.options = {
			loop 			: false,
			dir  			: 'h',
			autoHeight 		: false,
			spacing			: 5,
			mouseSwipe		: true,
			swipe			: true,
			speed			: 17,
			minSlideSpeed	: 2,
			viewNum			: 20,
			critMargin		: 1
		};
		
		$.extend(this.options , options);
		
		this.dir		= this.options.dir;
		this.loop   	= this.options.loop;
		this.spacing	= this.options.spacing;
		
		this.__width  = 0;
		this.__height = 0;

		this.__cssProb 		= this.dir === 'h' ? 'left'    : 'top';
		this.__offset 		= this.dir === 'h' ? 'offsetLeft' : 'offsetTop';
		this.__dimension    = this.dir === 'h' ? '__width' : '__height';

		this.__translate_end	= window._css3d ? ' translateZ(0px)' : '';

		this.$slideCont	= $('<div></div>').addClass('ms-slide-container');
		this.$element 	= $('<div></div>').addClass('ms-view').addClass('ms-basic-view').append(this.$slideCont);
	
		this.currentSlide 	= null;
		this.index 			= -1;
		this.slidesCount	= 0;

		this.slides			= [];
		this.slideList		= []; // All of slides with added priority sort;
		this.viewSlidesList = []; 
			
		this.css3 			= window._cssanim;
		this.start_buffer = 0;
		this.firstslide_snap = 0;
		
		this.slideChanged 	= false;

		this.controller 	 = new Controller(0 , 0 , {
			snapping	     : true,
			snapsize		 : 100,
			paging			 : true,
			snappingMinSpeed : this.options.minSlideSpeed,
			friction		 : (100 - this.options.speed * 0.5) / 100,
			endless			 : this.loop
		});
		
		this.controller.renderCallback(this.dir === 'h'? this._horizUpdate : this._vertiUpdate , this);
		this.controller.snappingCallback(this.__snapUpdate , this);
		this.controller.snapCompleteCallback(this.__snapCompelet , this);
		
		averta.EventDispatcher.call(this);
	};
	
	var p = MSBasicView.prototype;
		
	/*-------------- METHODS --------------*/
	
	p.__snapCompelet = function(snap , type){
		// if(this.loop && Math.abs(this.__contPos) > 20000){
		// 	this.__locateSlides();
		// 	this.gotoSlide(this.index , true);
		// }
		// 

		if ( !this.slideChanged ) {
			return;
		}

		this.slideChanged = false;
		
		this.__locateSlides();
		this.start_buffer = 0;
		this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_END));	
	};
	
	p.__snapUpdate = function(controller , snap , change){

		if(this.loop){
			var target_index = this.index + change;
			this.updateLoop(target_index);

			if(target_index >= this.slidesCount)	target_index = target_index - this.slidesCount;
			if(target_index <  0)					target_index = this.slidesCount + target_index;
		
			this.index = target_index;
		}else{
			if(snap < 0 ||  snap >= this.slidesCount) return
			this.index = snap;
		}
		
		this._checkCritMargins();

		if($.browser.mozilla){
			this.slideList[this.index].$element[0].style.marginTop 	= '0.1px';
			if(this.currentSlide){
				this.currentSlide.$element[0].style.marginTop 	= '';
			}
		}
		var new_slide = this.slideList[this.index];
		if(new_slide === this.currentSlide)return;
		this.currentSlide = new_slide;
		
		if ( this.autoUpdateZIndex ) {
			this.__updateSlidesZindex();
		}
		
		this.slideChanged = true;
		this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_START));	
	};


	p._checkCritMargins = function(){
		if(this.normalMode) return;

		var hlf 	= Math.floor(this.options.viewNum / 2),
			inView 	= this.viewSlidesList.indexOf(this.slideList[this.index]),
			size 	= (this[this.__dimension] + this.spacing),
			cm 		= this.options.critMargin;

		if(this.loop){
			if(inView <= cm || inView >= this.viewSlidesList.length - cm){
				size *= (inView - hlf);
				this.__locateSlides(false ,  size + this.start_buffer );
				this.start_buffer += size;
			}	

			return;
		}

		if( (inView < cm && this.index >= cm ) || (inView >= this.viewSlidesList.length - cm && this.index < this.slidesCount - cm)){
			this.__locateSlides(false);
		}

	};


	p._vertiUpdate = function(controller , value){
		
		this.__contPos = value;
		this.dispatchEvent(new MSViewEvents(MSViewEvents.SCROLL));
		
		if(this.css3){
			this.$slideCont[0].style[window._jcsspfx + 'Transform'] = 'translateY('+-value+'px)' + this.__translate_end;
			return;
		}

		this.$slideCont[0].style.top = -value + 'px';
		
	};
	
	p._horizUpdate = function(controller , value){

		this.__contPos = value;
		this.dispatchEvent(new MSViewEvents(MSViewEvents.SCROLL));
		
		if(this.css3) {
			this.$slideCont[0].style[window._jcsspfx + 'Transform'] = 'translateX('+-value+'px)'+ this.__translate_end;
			return;
		}
		
		this.$slideCont[0].style.left = -value + 'px';
		
	};


	p.__updateViewList = function(){

		if(this.normalMode) {
			this.viewSlidesList = this.slides;
			return;
		}

		var temp = this.viewSlidesList.slice();

		// update view list 
		this.viewSlidesList = [];	
		var i = 0 , hlf = Math.floor(this.options.viewNum / 2) , l;

		if(this.loop){
			for(; i !== this.options.viewNum ; i++)
				this.viewSlidesList.push(this.slides[this.currentSlideLoc - hlf + i]);
		}else{
			// before
			for(i = 0 ; i !== hlf && this.index - i !== -1 ; i++)
				this.viewSlidesList.unshift(this.slideList[this.index - i]);	
			// after
			for(i = 1; i !== hlf && this.index + i !== this.slidesCount; i++)
				this.viewSlidesList.push(this.slideList[this.index + i]);
		}

		for (i = 0 , l = temp.length ; i !== l ; i++)
			if( this.viewSlidesList.indexOf(temp[i]) === -1)
				temp[i].sleep();

		temp = null;

		if( this.currentSlide ) {
			this.__updateSlidesZindex();
		}
	};
	
	p.__locateSlides = function(move , start){

		this.__updateViewList();

		start = !this.loop ? this.slides.indexOf(this.viewSlidesList[0]) * (this[this.__dimension] + this.spacing ) : start || 0; 

		// old method
		/*for(i = 0; i < this.slidesCount ; ++i){
			var pos =  i * (this[this.__dimension] + this.spacing);
			
			this.slides[i].position = pos;
			this.slides[i].$element[0].style[this.__cssProb] =  pos + 'px';
		}*/

		var l = this.viewSlidesList.length , slide;
		
		for(var i = 0; i !== l ; i++){
			var pos =  start + i * (this[this.__dimension] + this.spacing );
			slide = this.viewSlidesList[i];
			slide.wakeup();
			slide.position = pos;
			slide.$element[0].style[this.__cssProb] =  pos + 'px';
		}

		if(move !== false)this.controller.changeTo( this.slideList[this.index].position , false , null , null , false);

	};
		
	p.__createLoopList = function(){ 
		var return_arr = [];
		var i = 0,
			count = this.slidesCount / 2;
		
		var before_count  = (this.slidesCount % 2 === 0)? count - 1	: Math.floor(count);
		var after_count	  = (this.slidesCount % 2 === 0)? count 	: Math.floor(count);
		
		this.currentSlideLoc = before_count;

		// before
		for(i = 1 ; i <= before_count ; ++i)
			return_arr.unshift(this.slideList[(this.index - i < 0)? this.slidesCount -  i + this.index: this.index - i]);
		
		// current
		return_arr.push(this.slideList[this.index]);
		
		// after
		for(i = 1; i <= after_count; ++i)
			return_arr.push(this.slideList[(this.index + i >= this.slidesCount)? this.index + i - this.slidesCount : this.index + i]);
		
		return return_arr;
		
	};
	
	/*
	 * Calculate shortest distance from index to target.
	 * It will used in loop gesture.
	 * 
	 * Negative values means left direction.
	 */
	
	p.__getSteps = function(index , target){ 
		var right = (target < index)?  this.slidesCount - index + target : target - index;
		var left  = Math.abs(this.slidesCount - right);
		
		return (right < left)? right : -left;		
	};
	
	p.__pushEnd = function(){ 
		var first_slide = this.slides.shift();
		var last_slide = this.slides[this.slidesCount - 2];
		
		this.slides.push(first_slide);
		
		if(!this.normalMode) return;

		var pos = last_slide.$element[0][this.__offset] + this.spacing + this[this.__dimension];
		first_slide.$element[0].style[this.__cssProb] = pos + 'px';
		first_slide.position = pos;
	};
	
	p.__pushStart = function(){ 
		var last_slide =  this.slides.pop();
		var first_slide = this.slides[0];
		
		this.slides.unshift(last_slide);

		if(!this.normalMode) return;

		var pos = first_slide.$element[0][this.__offset] - this.spacing - this[this.__dimension];
		last_slide.$element[0].style[this.__cssProb] = pos + 'px';
		last_slide.position = pos;
	};

	// @since 1.7.0
	// adds z-index to slides
	p.__updateSlidesZindex = function(){
		

		var slide,
			l = this.viewSlidesList.length,
			hlf = Math.floor( l/2 );

		if( this.loop ){
			var loc = this.viewSlidesList.indexOf(this.currentSlide);
			for ( var i = 0; i!==l; i++ ){
				slide = this.viewSlidesList[i];
				this.viewSlidesList[i].$element.css('z-index', i<=loc ? i+1 : l-i);
			}
		} else {
			
			var beforeNum = this.currentSlide.index - this.viewSlidesList[0].index,
				afterNum = l - beforeNum,
				diff = beforeNum - afterNum; 

			for ( var i = 0; i!==l; i++ ){
				this.viewSlidesList[i].$element.css('z-index', i<=beforeNum ? i+1 : l-i);
			}

			this.currentSlide.$element.css('z-index', l);
		}
		
	};

	p.addSlide = function(slide){ 
		slide.view = this;
		this.slides.push(slide);
		this.slideList.push(slide);
		this.slidesCount++;
	};
	
	p.appendSlide = function(slide){
		this.$slideCont.append(slide.$element);
	};

	p.updateLoop = function(index){
		if(this.loop){
			var steps = this.__getSteps(this.index , index);
			
			for(var i = 0 , l = Math.abs(steps) ; i < l ; ++ i){
				if(steps < 0) 	this.__pushStart();
				else			this.__pushEnd();
			}
		}
	};
	
	p.gotoSlide = function(index , fast){
		this.updateLoop(index);
		this.index = index;
		
		var target_slide = this.slideList[index];

		this._checkCritMargins();

		this.controller.changeTo( target_slide.position , !fast , null , null , false);
		if(target_slide === this.currentSlide) return;
		this.slideChanged = true;
		this.currentSlide = target_slide;

		if ( this.autoUpdateZIndex ) {
			this.__updateSlidesZindex();
		}

		this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_START));
		if(fast)this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_END));	
	}; 
	
	p.next = function(checkLoop){ 
		if ( checkLoop && !this.loop && this.index + 1 >= this.slidesCount ) {
			this.controller.bounce(10);
			return;
		}

		this.gotoSlide((this.index + 1 >= this.slidesCount)? 0 : this.index + 1);
	};
	
	p.previous = function(checkLoop){ 
		if ( checkLoop && !this.loop && this.index - 1 < 0 ) {
			this.controller.bounce(-10);
			return;
		}

		this.gotoSlide((this.index - 1 < 0)? this.slidesCount - 1 : this.index - 1);
	};
	
	/* --------------- Swipe control ------------------*/	
	
	p.setupSwipe = function(){ 
		
		this.swipeControl = new averta.TouchSwipe(this.$element);
		this.swipeControl.swipeType = this.dir === 'h'? 'horizontal' : 'vertical';
		var that = this;
		
		if(this.dir === 'h'){
			this.swipeControl.onSwipe = function(status){
				that.horizSwipeMove(status);
			};
		}else{
			this.swipeControl.onSwipe = function(status){
				that.vertSwipeMove(status);
			};
		}
		
	};
	
	p.vertSwipeMove = function(status){
		var phase = status.phase;
		if(phase === 'start'){
			this.controller.stop();
			this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_START, status));		
		}else if(phase === 'move' && (!this.loop || Math.abs(this.currentSlide.position - this.controller.value + status.moveY ) < this.cont_size / 2)){
			this.controller.drag(status.moveY);
			this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_MOVE, status));
		}else if(phase === 'end' || phase === 'cancel'){
			
			var speed = status.distanceY / status.duration * 50/3;
			
			if(Math.abs(speed) > 0.1){
				this.controller.push(-speed);
				if(speed > this.controller.options.snappingMinSpeed)
				this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_END, status));
			}else {
				this.controller.cancel();
				this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_CANCEL, status));
			}
			
		}
	};
	
	p.horizSwipeMove = function(status){	
		var phase = status.phase;
		//console.log(this.loop)
		if(phase === 'start'){
			this.controller.stop();
			this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_START, status));		
		}else if(phase === 'move' && (!this.loop || Math.abs(this.currentSlide.position - this.controller.value + status.moveX ) < this.cont_size / 2)){
			this.controller.drag(status.moveX);
			this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_MOVE, status));
		}else if(phase === 'end' || phase === 'cancel'){
			
			var speed = status.distanceX / status.duration * 50/3;
			
			if(Math.abs(speed) > 0.1){
				this.controller.push(-speed );
				if(speed > this.controller.options.snappingMinSpeed)
				this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_END, status));
			}else{
				this.controller.cancel();
				this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_CANCEL, status));
			}
			
		}
	};
		
	/* ------------------------------------------------*/	
	
	p.setSize = function(width , height , hard){
		if(this.lastWidth === width && height === this.lastHeight && !hard) return;

		this.$element.width(width).height(height);
		
		for(var i = 0; i < this.slidesCount ; ++i)
				this.slides[i].setSize(width , height , hard);
				
		this.__width 	= width;
		this.__height 	= height;
			
		if(this.__created){	
			this.__locateSlides();
			
			this.cont_size = (this.slidesCount - 1) * (this[this.__dimension] + this.spacing);
			if(!this.loop) 	this.controller._max_value = this.cont_size;
				
			this.controller.options.snapsize = this[this.__dimension] + this.spacing;
			this.controller.changeTo(this.currentSlide.position , false , null , null , false );
			this.controller.cancel();
			
			this.lastWidth = width;
			this.lastHeight = height;
		}
	};
	
	p.create = function(index){
		
		this.__created = true;
		
		this.index = Math.min((index || 0), this.slidesCount - 1);
		this.lastSnap = this.index; // it will be used to check snap changed or not on snap complete

		if(this.loop)
			this.slides = this.__createLoopList();

		this.normalMode = this.slidesCount <= this.options.viewNum;
				
		for(var i = 0; i < this.slidesCount ; ++i)
			this.slides[i].create();
		
		this.__locateSlides();
			
		this.controller.options.snapsize = this[this.__dimension] + this.spacing;		
		if(!this.loop)	this.controller._max_value = (this.slidesCount - 1) * (this[this.__dimension] + this.spacing);
		
		this.gotoSlide(this.index , true);
		
		if(this.options.swipe && (window._touch || this.options.mouseSwipe))
			this.setupSwipe();

	};
	
	p.destroy = function(){
		if(!this.__created) return;
		
		for(var i = 0; i < this.slidesCount ; ++i)
			this.slides[i].destroy();
			
		this.slides = null;
		this.slideList = null;
		this.$element.remove();
		
		this.controller.destroy();
		this.controller = null;
	};
	
	averta.EventDispatcher.extend(p);
	
	MSSlideController.registerView('basic' , MSBasicView);
	
})(jQuery);

/* ================== bin-debug/js/pro/views/WaveView.js =================== */
;(function($){
	
	"use strict";
	
	window.MSWaveView = function(options){
		MSBasicView.call(this , options);
		this.$element.removeClass('ms-basic-view').addClass('ms-wave-view');
		this.$slideCont.css(window._csspfx + 'transform-style' , 'preserve-3d');

		// Auto update z index of slides 
		// @since 1.7
		this.autoUpdateZIndex = true;
	};
	
	MSWaveView.extend(MSBasicView);
	MSWaveView._3dreq = true;
	MSWaveView._fallback = MSBasicView;
	
	var p  = MSWaveView.prototype;
	var _super  = MSBasicView.prototype;
	 
	/*-------------- METHODS --------------*/
	
	/*p.__setSlideTransDuration = function(value){
		for(var i=0; i<this.slidesCount; ++i)
			this.slides[i].$element.css(window._csspfx + 'transition-duration' , value + 'ms');
	};*/
	
	p._horizUpdate = function(controller , value){
		
		_super._horizUpdate.call(this, controller , value);
		
		var cont_scroll = -value;
		var slide_pos , slide , distance;
		
		for(var i = 0; i < this.slidesCount; ++i){
			slide = this.slideList[i];
			//slide_pos = parseInt(slide.$element.css('left'));
			distance = -cont_scroll - slide.position;
			this.__updateSlidesHoriz(slide , distance);
		}
		
	};
	
	p._vertiUpdate = function(controller , value){
		
		_super._vertiUpdate.call(this, controller , value);
		
		var cont_scroll = -value;
		var slide_pos , slide , distance;
		
		for(var i = 0; i < this.slidesCount; ++i){
			slide = this.slideList[i];
			//slide_pos = parseInt(slide.$element.css('left'));
			distance = -cont_scroll - slide.position;
			this.__updateSlidesVertic(slide , distance);
		}
		
	};
	
	
	p.__updateSlidesHoriz = function(slide , distance){
		var value =  Math.abs(distance * 100 / this.__width);
		//var value2 = Math.min(value , 100);
	//	var sp = Math.min(100 , )
		//slide.$bg_img.css('opacity' , (100 -  Math.abs(distance * 120 / this.__width / 3)) / 100);
		slide.$element.css(window._csspfx + 'transform' , 'translateZ('+ -value * 3 +'px) rotateY(0.01deg)'/* translateX('+(distance < 0 ? 1 : -1) * -value * 5+'px)'*/);
	};
	
	p.__updateSlidesVertic = function(slide , distance){
		this.__updateSlidesHoriz(slide , distance);
	};
	
	/*
	p.swipeMove = function(status){
		
		if(status.phase == 'start'){
			this.__setSlideTransDuration(0);
		}else if(status.phase == 'end'){
			this.__setSlideTransDuration(this.__slideDuration);
		}
		
		_super.swipeMove.call(this , status);
	};
	
	p.create = function(index){
		_super.create.call(this , index);
		
		for(var i = 0; i<this.slidesCount ; ++i){
			this.slides[i].$element.css(window._csspfx + 'transition-property' , window._csspfx 		+ 'transform');
			this.slides[i].$element.css(window._csspfx + 'transition-duration' , this.slideDuration + 'ms');
		}
	};
	*/
	MSSlideController.registerView('wave' , MSWaveView);
})(jQuery);

/* ================== bin-debug/js/pro/views/FadeBasicView.js =================== */
/**
 * Master Slider Fade Basic view
 * @author averta
 * @version 1.1
 * @package MS
 */

;(function(){
	
	window.MSFadeBasicView = function(options){
		MSWaveView.call(this , options);
		this.$element.removeClass('ms-wave-view').addClass('ms-fade-basic-view');
	};
	
	MSFadeBasicView.extend(MSWaveView);
	
	var p = MSFadeBasicView.prototype;
	var _super = MSFadeBasicView.prototype;
	
	/*-------------- METHODS --------------*/
	
	p.__updateSlidesHoriz = function(slide , distance){
		var value =  Math.abs(distance * 0.6 / this.__width);
		value = 1 - Math.min(value , 0.6);
		slide.$element.css('opacity' , value);
	};
	
	p.__updateSlidesVertic = function(slide , distance){
		this.__updateSlidesHoriz(slide , distance);
	};
	
	MSSlideController.registerView('fadeBasic' , MSFadeBasicView);
	MSWaveView._fallback = MSFadeBasicView;
})();

/* ================== bin-debug/js/pro/views/FadeWaveView.js =================== */
/**
 * Master Slider Fade Wave View
 * @author averta
 * @version 1.0
 * @extends {MSWaveView}
 */
;(function(){
	
	window.MSFadeWaveView = function(options){
		MSWaveView.call(this , options);
		this.$element.removeClass('ms-wave-view').addClass('ms-fade-wave-view');
	};
	
	MSFadeWaveView.extend(MSWaveView);
	MSFadeWaveView._3dreq = true;
	MSFadeWaveView._fallback = MSFadeBasicView;
	
	var p = MSFadeWaveView.prototype;
	var _super = MSWaveView.prototype;
	
	/*-------------- METHODS --------------*/
	
	p.__updateSlidesHoriz = function(slide , distance){
		var value =  Math.abs(distance * 100 / this.__width);
		 value = Math.min(value , 100);
		slide.$element.css('opacity' , 1-value/300);
		slide.$element[0].style[window._jcsspfx + 'Transform'] = 'scale('+ (1 - value/800) +') rotateY(0.01deg) ';
	};
	
	p.__updateSlidesVertic = function(slide , distance){
		this.__updateSlidesHoriz(slide , distance);
	};
	
	MSSlideController.registerView('fadeWave' , MSFadeWaveView);
	
})();

/* ================== bin-debug/js/pro/views/FlowView.js =================== */
;(function($){
	
	"use strict";
	
	window.MSFlowView = function(options){
		MSWaveView.call(this , options);
		this.$element.removeClass('ms-wave-view').addClass('ms-flow-view');
		//this.$slideCont.css(window._csspfx + 'transform-style' , 'preserve-3d');
	};
	
	MSFlowView.extend(MSWaveView);
	MSFlowView._3dreq = true;
	MSFlowView._fallback = MSFadeBasicView;
	
	var p  = MSFlowView.prototype;
	var _super  = MSWaveView.prototype;
	 
	/*-------------- METHODS --------------*/
	
	
	p.__updateSlidesHoriz = function(slide , distance){
		var value  =  Math.abs(distance * 100 / this.__width);
		var rvalue =  Math.min(value * 0.3 , 30) * (distance < 0 ? -1 : 1);
		var zvalue = value * 1.2;
		slide.$element[0].style[window._jcsspfx + 'Transform'] = 'translateZ('+ -zvalue*5 +'px) rotateY(' + rvalue + 'deg) ';
	};
	
	p.__updateSlidesVertic  = function(slide , distance){
		var value  =  Math.abs(distance * 100 / this.__width);
		var rvalue =  Math.min(value * 0.3 , 30) * (distance < 0 ? -1 : 1);
		var zvalue = value * 1.2;
		slide.$element[0].style[window._jcsspfx + 'Transform'] = 'translateZ('+ -zvalue*5 +'px) rotateX(' + -rvalue + 'deg) ';
	};
	
	
	MSSlideController.registerView('flow' , MSFlowView);
})(jQuery);

/* ================== bin-debug/js/pro/views/FadeFlowView.js =================== */
/**
 * Master Slider Fade Flow View
 * @author averta
 * @extends {MSWaveView}
 * @version 1.0
 */
;(function(){
	
	window.MSFadeFlowView = function(options){
		MSWaveView.call(this , options);
		this.$element.removeClass('ms-wave-view').addClass('ms-fade-flow-view');
	};
	
	MSFadeFlowView.extend(MSWaveView);
	MSFadeFlowView._3dreq = true;

	var p = MSFadeFlowView.prototype;
	var _super = MSWaveView.prototype;
	
	/*-------------- METHODS --------------*/
	
	p.__calculate = function(distance){
		var value = Math.min(Math.abs(distance * 100 / this.__width) , 100);
		var rvalue =  Math.min(value * 0.5 , 50) * (distance < 0 ? -1 : 1);
		return {value: value, rvalue: rvalue};
	};

	p.__updateSlidesHoriz = function(slide , distance){
		var clc = this.__calculate(distance);
		slide.$element.css('opacity' , 1-clc.value/300);
		console.log(window._jcsspfx + 'transform','translateZ('+ -clc.value +'px) rotateY(' + clc.rvalue + 'deg) ')
		slide.$element[0].style[window._jcsspfx + 'Transform'] = 'translateZ('+ -clc.value +'px) rotateY(' + clc.rvalue + 'deg) ';
	};
	
	p.__updateSlidesVertic = function(slide , distance){
		var clc = this.__calculate(distance);
		slide.$element.css('opacity' , 1-clc.value/300);
		slide.$element[0].style[window._jcsspfx + 'Transform'] = 'translateZ('+ -clc.value +'px) rotateX(' + -clc.rvalue + 'deg) ';
	};
	
	MSSlideController.registerView('fadeFlow' , MSFadeFlowView);
	
})();

/* ================== bin-debug/js/pro/views/MaskView.js =================== */
;(function($){
	
	"use strict";
	
	window.MSMaskView = function(options){
		MSBasicView.call(this , options);
		this.$element.removeClass('ms-basic-view').addClass('ms-mask-view');
		
	};
	
	MSMaskView.extend(MSBasicView);
	
	var p  = MSMaskView.prototype;
	var _super  = MSBasicView.prototype;
		
	/*-------------- METHODS --------------*/
	
	p.addSlide = function(slide){ // OK
		slide.view = this;
		
		slide.$frame = $('<div></div>').addClass('ms-mask-frame').append(slide.$element);
		slide.$element[0].style.position = 'relative';
		//this.$slideCont.append(slide.$frame);
		slide.autoAppend = false;

		this.slides.push(slide);
		this.slideList.push(slide);
		
		this.slidesCount++;
	};
	
	p.setSize = function(width , height){
		var slider = this.slides[0].slider;
		
		for(var i = 0; i < this.slidesCount ; ++i){
			this.slides[i].$frame[0].style.width  = width  + 'px';
			if(!slider.options.autoHeight)
				this.slides[i].$frame[0].style.height = height + 'px';
		}
		
		_super.setSize.call(this , width , height);
	};
	
	// p.__snapUpdate = function(controller , snap , change){
		
	// 	if(this.loop){
	// 		var target_index = this.index + change;
	// 		this.updateLoop(target_index);

	// 		if(target_index >= this.slidesCount)	target_index = target_index - this.slidesCount;
	// 		if(target_index <  0)					target_index = this.slidesCount + target_index;
		
	// 		this.index = target_index;
	// 	}else{
	// 		if(snap < 0 ||  snap >= this.slidesCount) return
	// 		this.index = snap;
	// 	}
		
		
	// 	this._checkCritMargins();

	// 	if($.browser.mozilla){
			
	// 		this.slideList[this.index].$frame[0].style.marginTop 	= '0.1px';
	// 		this.slideList[this.index].$element[0].style.marginTop 	= '0.1px';
			
	// 		if(this.currentSlide){
	// 			this.currentSlide.$frame[0].style.marginTop 	= '';
	// 			this.currentSlide.$element[0].style.marginTop 	= '';
	// 		}
	// 	}
		
	// 		var new_slide = this.slideList[this.index];
	// 	if(new_slide === this.currentSlide)return;
		
	// 	this.currentSlide = new_slide;
	// 	this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_START));		
	// };
	
	p._horizUpdate = function(controller , value){
		
		_super._horizUpdate.call(this , controller , value);
		
		var i = 0;
		
		if(this.css3) {
			for(i = 0 ; i < this.slidesCount ; ++i){
				this.slideList[i].$element[0].style[window._jcsspfx + 'Transform'] = 'translateX('+(value - this.slideList[i].position)+'px)'+ this.__translate_end;
			}
			return;
		}
		
		for(i = 0 ; i < this.slidesCount ; ++i){
			this.slideList[i].$element[0].style.left = (value - this.slideList[i].position) + 'px';	
		}
			
	};
	
	p._vertiUpdate = function(controller , value){
		
		_super._vertiUpdate.call(this , controller , value);
		
		var i = 0;
		
		if(this.css3) {
			for(i = 0 ; i < this.slidesCount ; ++i){
				this.slideList[i].$element[0].style[window._jcsspfx + 'Transform'] = 'translateY('+(value - this.slideList[i].position)+'px)'+ this.__translate_end;
			}
			return;
		}
		
		for(i = 0 ; i < this.slidesCount ; ++i){
			this.slideList[i].$element[0].style.top = (value - this.slideList[i].position) + 'px';	
		}
			
	};
	
	p.__pushEnd = function(){ // OK
		var first_slide = this.slides.shift();
		var last_slide = this.slides[this.slidesCount - 2];
		
		this.slides.push(first_slide);
		if(!this.normalMode) return;

		var pos = last_slide.$frame[0][this.__offset] + this.spacing + this[this.__dimension];
		first_slide.$frame[0].style[this.__cssProb] = pos + 'px';
		first_slide.position = pos;
	};
	
	p.__pushStart = function(){ // OK
		
		var last_slide =  this.slides.pop();
		var first_slide = this.slides[0];
		
		this.slides.unshift(last_slide);
		
		if(!this.normalMode) return;
		
		var pos = first_slide.$frame[0][this.__offset] - this.spacing - this[this.__dimension];
		last_slide.$frame[0].style[this.__cssProb] = pos + 'px';
		last_slide.position = pos;
	};
	
	p.__updateViewList = function(){

			if(this.normalMode) {
			this.viewSlidesList = this.slides;
			return;
		}

		var temp = this.viewSlidesList.slice();

		// update view list 
		this.viewSlidesList = [];	
		var i = 0 , hlf = Math.floor(this.options.viewNum / 2) , l;

		if(this.loop){
			for(; i !== this.options.viewNum ; i++)
				this.viewSlidesList.push(this.slides[this.currentSlideLoc - hlf + i]);
		}else{
			// before
			for(i = 0 ; i !== hlf && this.index - i !== -1 ; i++)
				this.viewSlidesList.unshift(this.slideList[this.index - i]);	
			// after
			for(i = 1; i !== hlf && this.index + i !== this.slidesCount; i++)
				this.viewSlidesList.push(this.slideList[this.index + i]);
		}

		for (i = 0 , l = temp.length ; i !== l ; i++){
			if( this.viewSlidesList.indexOf(temp[i]) === -1){
				temp[i].sleep();
				temp[i].$frame.detach();
			}
		}

		temp = null;
	};


	p.__locateSlides = function(move , start){ // OK

		this.__updateViewList();

		start = !this.loop ? this.slides.indexOf(this.viewSlidesList[0]) * (this[this.__dimension] + this.spacing ) : start || 0; 

		// Old method
		// for(var i = 0; i < this.slidesCount ; ++i){
		// 	var pos =  i * (this[this.__dimension] + this.spacing);
			
		// 	this.slides[i].position = pos;
		// 	this.slides[i].$frame[0].style[this.__cssProb] =  pos + 'px';
		// }

		var l = this.viewSlidesList.length , slide;
		
		for(var i = 0; i !== l ; i++){
			var pos =  start + i * (this[this.__dimension] + this.spacing );
			slide = this.viewSlidesList[i];

			this.$slideCont.append(slide.$frame);
			slide.wakeup(false);
			slide.position = pos;

			if ( slide.selected && slide.bgvideo ) {
				try{
					slide.bgvideo.play();
				} catch (e) {}
			}

			slide.$frame[0].style[this.__cssProb] =  pos + 'px';
		}

		if(move !== false)this.controller.changeTo( this.slideList[this.index].position , false , null , null , false);

	};
	
	MSSlideController.registerView('mask' , MSMaskView);
})(jQuery);

/* ================== bin-debug/js/pro/views/ParallaxMaskView.js =================== */
;(function($){
	
	"use strict";
	
	window.MSParallaxMaskView = function(options){
		MSMaskView.call(this , options);
		this.$element.removeClass('ms-basic-view').addClass('ms-parallax-mask-view');
		
	};
	
	MSParallaxMaskView.extend(MSMaskView);
	MSParallaxMaskView.parallaxAmount = 0.5;

	var p  = MSParallaxMaskView.prototype;
	var _super  = MSBasicView.prototype;
		
	/*-------------- METHODS --------------*/
	
	p._horizUpdate = function(controller , value){
		_super._horizUpdate.call(this , controller , value);
		
		var i = 0;
		
		if(this.css3) {
			for(i = 0 ; i < this.slidesCount ; ++i){
				this.slideList[i].$element[0].style[window._jcsspfx + 'Transform'] = 'translateX('+(value - this.slideList[i].position) * MSParallaxMaskView.parallaxAmount +'px)'+ this.__translate_end;
			}
			return;
		}
		
		for(i = 0 ; i < this.slidesCount ; ++i){
			this.slideList[i].$element[0].style.left = (value - this.slideList[i].position) * MSParallaxMaskView.parallaxAmount  + 'px';	
		}
			
	};
	
	p._vertiUpdate = function(controller , value){
		
		_super._vertiUpdate.call(this , controller , value);
		
		var i = 0;
		
		if(this.css3) {
			for(i = 0 ; i < this.slidesCount ; ++i){
				this.slideList[i].$element[0].style[window._jcsspfx + 'Transform'] = 'translateY('+(value - this.slideList[i].position) * MSParallaxMaskView.parallaxAmount +'px)'+ this.__translate_end;
			}
			return;
		}
		
		for(i = 0 ; i < this.slidesCount ; ++i){
			this.slideList[i].$element[0].style.top = (value - this.slideList[i].position) * MSParallaxMaskView.parallaxAmount  + 'px';	
		}
			
	};
	
	
	MSSlideController.registerView('parallaxMask' , MSParallaxMaskView);
})(jQuery);

/* ================== bin-debug/js/pro/views/FadeView.js =================== */
;(function($){
	
	"use strict";
	
	window.MSFadeView = function(options){
		MSBasicView.call(this , options);
		this.$element.removeClass('ms-basic-view').addClass('ms-fade-view');
		this.controller.renderCallback(this.__update , this);
	};
	
	MSFadeView.extend(MSBasicView);
	
	var p  = MSFadeView.prototype;
	var _super  = MSBasicView.prototype;
	 
	/*-------------- METHODS --------------*/
	
	p.__update = function(controller , value){
		var cont_scroll = -value;
		var slide_pos , slide , distance;
		
		for(var i = 0; i < this.slidesCount; ++i){
			slide = this.slideList[i];
			distance = -cont_scroll - slide.position;
			this.__updateSlides(slide , distance);
		}
	};
	
	p.__updateSlides = function(slide , distance){
		var value =  Math.abs(distance / this[this.__dimension]);
		if(1 - value <= 0){
			slide.$element.fadeTo(0 , 0).css('visibility' , 'hidden');	
		}else{
			slide.$element.fadeTo(0 , 1 - value).css('visibility' , '');
		}
	};
	
	p.__locateSlides = function(move , start){

		this.__updateViewList();

		// Old method
		// for(var i = 0; i < this.slidesCount ; ++i){
		// 	this.slides[i].position = i * this[this.__dimension];
		// }

		start = !this.loop ? this.slides.indexOf(this.viewSlidesList[0]) * (this[this.__dimension] + this.spacing ) : start || 0; 

		var l = this.viewSlidesList.length , slide;
		
		for(var i = 0; i !== l ; i++){
			var pos =  start + i * this[this.__dimension];
			slide = this.viewSlidesList[i];
			slide.wakeup();
			slide.position = pos;
		}

		if(move !== false)this.controller.changeTo( this.slideList[this.index].position , false , null , null , false);

	};
	
	p.__pushEnd = function(){
		var first_slide = this.slides.shift();
		var last_slide = this.slides[this.slidesCount - 2];
		this.slides.push(first_slide);
		first_slide.position = last_slide.position + this[this.__dimension];
	};
	
	p.__pushStart = function(){
		var last_slide =  this.slides.pop();
		var first_slide = this.slides[0];
		this.slides.unshift(last_slide);		
		last_slide.position = first_slide.position - this[this.__dimension];
	};
	
	p.create = function(index){
		_super.create.call(this , index);
		this.spacing = 0;
		this.controller.options.minValidDist = 10;
	};
	
	MSSlideController.registerView('fade' , MSFadeView);
})(jQuery);

/* ================== bin-debug/js/pro/views/ScaleView.js =================== */
;(function($){
	
	"use strict";
	
	window.MSScaleView = function(options){
		MSBasicView.call(this , options);
		this.$element.removeClass('ms-basic-view').addClass('ms-scale-view');
		this.controller.renderCallback(this.__update , this);
	};
	
	MSScaleView.extend(MSFadeView);
	
	var p  = MSScaleView.prototype;
	var _super  = MSFadeView.prototype;
	 
	/*-------------- METHODS --------------*/

	p.__updateSlides = function(slide , distance){
		var value =  Math.abs(distance / this[this.__dimension]),
			element = slide.$element[0]; 

		if(1 - value <= 0){
			element.style.opacity = 0;
			element.style.visibility = 'hidden';
			element.style[window._jcsspfx + 'Transform'] = '';
		}else{
			element.style.opacity = 1 - value;
			element.style.visibility = '';
			element.style[window._jcsspfx + 'Transform'] = 'perspective(2000px) translateZ('+(value* (distance < 0 ? -0.5 : 0.5)) * 300+'px)';
		}
		
	};
	
	p.create = function(index){
		_super.create.call(this , index);
		this.controller.options.minValidDist = 0.03;
	};
	
	MSSlideController.registerView('scale' , MSScaleView);
})(jQuery);

/* ================== bin-debug/js/pro/views/StackView.js =================== */
/**
 * Master Slider Stack View 
 * @package Master Slider jQuery
 * @author Averta
 */

;(function($){
	
	"use strict";
	
	window.MSStackView = function(options){
		MSBasicView.call(this , options);
		this.$element.removeClass('ms-basic-view').addClass('ms-stack-view');
		this.controller.renderCallback(this.__update , this);
		this.autoUpdateZIndex = true;
	};
	
	MSStackView.extend(MSFadeView);
	MSStackView._3dreq = true;
	MSStackView._fallback = MSFadeView;
	
	var p  = MSStackView.prototype;
	var _super  = MSFadeView.prototype;
	 
	/*-------------- METHODS --------------*/

	/**
	 * Updates slides z index
	 */
	p.__updateSlidesZindex = function () {
		var slide,
			l = this.viewSlidesList.length;

		for ( var i = 0; i!==l; i++ ){
			slide = this.viewSlidesList[i];
			this.viewSlidesList[i].$element.css('z-index', l-i);
		}
		
	};

	
	p.__updateSlides = function(slide , distance){
		var value =  Math.abs(distance / this[this.__dimension]),
			element = slide.$element[0]; 

		if(1 - value <= 0){
			element.style.opacity = 1;
			element.style.visibility = 'hidden';
			element.style[window._jcsspfx + 'Transform'] = '';
		}else{
			element.style.visibility = '';
			
			if ( distance < 0 ) {
				element.style[window._jcsspfx + 'Transform'] = 'perspective(2000px) translateZ('+ (value * -300) +'px)';
			} else {
				element.style[window._jcsspfx + 'Transform'] = this.__translate + '(' + ( -value * this[this.__dimension] ) +'px)';
			}

		}
		
	};
	

	p.create = function(index){
		_super.create.call(this , index);
		this.controller.options.minValidDist = 0.03;
		this.__translate = this.dir === 'h' ? 'translateX' : 'translateY';
	};

	
	MSSlideController.registerView('stack' , MSStackView);
})(jQuery);

/* ================== bin-debug/js/pro/views/FocusView.js =================== */
/**
 * Master Slider Focus View
 * @version 1.1
 * @author averta
 * @package MS
 * @extends {MSFadeBasicView}
 */

;(function(){

	'use strict';
	
	var perspective = 2000;

	window.MSFocusView = function(options){
		MSWaveView.call(this , options);
		this.$element.removeClass('ms-wave-view').addClass('ms-focus-view');
		this.options.centerSpace = this.options.centerSpace  || 1;
	};
	
	MSFocusView.extend(MSWaveView);
	MSFocusView._3dreq = true;
	MSFocusView._fallback = MSFadeBasicView;
	
	var p = MSFocusView.prototype;
	var _super = MSWaveView.prototype;
	
	/*-------------- METHODS --------------*/
	
	p.__calcview = function(z , w){
		var a =  w / 2 * z / (z + perspective); 
		return a * (z + perspective) / perspective;
	};
	
	p.__updateSlidesHoriz = function(slide , distance){
		var value =  Math.abs(distance * 100 / this.__width);
		value = -Math.min(value , 100)* 15;
		slide.$element.css(window._csspfx + 'transform' , 'translateZ('+ (value + 1) +'px) rotateY(0.01deg) translateX('+ (distance < 0 ? 1 : -1) * (-this.__calcview(value, this.__width) * this.options.centerSpace )+'px)');
	};
	
	p.__updateSlidesVertic = function(slide , distance){
		var value =  Math.abs(distance * 100 / this.__width);
		value = -Math.min(value , 100)* 15;
		slide.$element.css(window._csspfx + 'transform' , 'translateZ('+ (value + 1) +'px) rotateY(0.01deg) translateY('+ (distance < 0 ? 1 : -1) * (-this.__calcview(value, this.__width) * this.options.centerSpace )+'px)');
	};
	
	MSSlideController.registerView('focus' , MSFocusView);
	
})();

/* ================== bin-debug/js/pro/views/PartialWaveView.js =================== */
/**
 * Master Slider Partial Wave View
 * @version 1.0
 * @author averta
 * @extends {MSWaveView}
 */

;(function(){
	
	window.MSPartialWaveView = function(options){
		MSWaveView.call(this , options);
		this.$element.removeClass('ms-wave-view').addClass('ms-partial-wave-view');
	};
	
	MSPartialWaveView.extend(MSWaveView);
	MSPartialWaveView._3dreq = true;
	MSPartialWaveView._fallback = MSFadeBasicView;
	
	var p = MSPartialWaveView.prototype;
	var _super = MSWaveView.prototype;
	
	/*-------------- METHODS --------------*/
	
	p.__updateSlidesHoriz = function(slide , distance){
		var value =  Math.abs(distance * 100 / this.__width);
		if( slide.hasBG ){
			slide.$bg_img.css('opacity' , (100 -  Math.abs(distance * 120 / this.__width / 3)) / 100);	
		}
		slide.$element.css(window._csspfx + 'transform' , 'translateZ('+ -value * 3 +'px) rotateY(0.01deg) translateX('+distance*0.75+'px)');
	};
	
	p.__updateSlidesVertic = function(slide , distance){
		var value =  Math.abs(distance * 100 / this.__width);
		if( slide.hasBG ){
			slide.$bg_img.css('opacity' , (100 -  Math.abs(distance * 120 / this.__width / 3)) / 100);
		}
		slide.$element.css(window._csspfx + 'transform' , 'translateZ('+ -value * 3 +'px) rotateY(0.01deg) translateY('+distance*0.75+'px)');
	};
	
	MSSlideController.registerView('partialWave' , MSPartialWaveView);
	
})();

/* ================== bin-debug/js/pro/uicontrols/BaseControl.js =================== */
;(function($){
	
	"use strict";
	
	var BaseControl = function(){
		this.options = {
			prefix:'ms-',
			autohide:true,
			overVideo:true,
			customClass: null
		};
	};
	
	var p = BaseControl.prototype;
	
	/* -------------------------------- */
	
	p.slideAction = function(slide){

	};
	
	p.setup = function(){		
		this.cont = this.options.insertTo ? $(this.options.insertTo) : this.slider.$controlsCont;
		if(!this.options.overVideo) this._hideOnvideoStarts();

	};

	p.checkHideUnder = function(){
		if(this.options.hideUnder){
			//this.slider.api.addEventListener(MSSliderEvent.RESIZE, this.onSliderResize, this);
			this.needsRealign = !this.options.insetTo && (this.options.align === 'left' || this.options.align === 'right') && this.options.inset === false;
			$(window).bind('resize', {that:this}, this.onResize);
			this.onResize();

		}
	};

	/**
	 * hide control if width of slider changes to lower that specified value [hideUnder]
	 * @since 1.5.7
	 * @protected
	 */
	p.onResize = function(event){
		var that = (event && event.data.that) || this;
		var w = window.innerWidth;
		if( w <= that.options.hideUnder && !that.detached ){
			that.hide(true);
			that.detached = true;
			that.onDetach();
		}else if( w >= that.options.hideUnder && that.detached ){
			that.detached = false;
			that.visible();
			that.onAppend();
		}
	};
	
	p.create = function(){
		var that = this;
		if(this.options.autohide ){
			
			this.hide(true);
			
			this.slider.$controlsCont.mouseenter($.proxy(this._onMouseEnter, this))
									 .mouseleave($.proxy(this._onMouseLeave, this))
									 .mousedown($.proxy(this._onMouseDown, this));

			if ( this.$element ) {
				this.$element.mouseenter($.proxy(this._onMouseEnter, this))
							 .mouseleave($.proxy(this._onMouseLeave, this))
							 .mousedown($.proxy(this._onMouseDown, this));
			}

			$(document).mouseup($.proxy(this._onMouseUp, this));
		}
		
		if ( this.options.align ) {
			this.$element.addClass('ms-align-' + this.options.align);
		}

		// add custom class to control 
		if ( this.options.customClass && this.$element ) {
			this.$element.addClass(this.options.customClass);
		}
	};

	/**
	 * Mouse Enter Listener 
	 * @since 2.2
	 */
	p._onMouseEnter = function(){
		if ( !this._disableAH && !this.mdown ){
			this.visible();
		}
		
		this.mleave = false;
	};

	/**
	 * Mouse Leave Listener 
	 * @since 2.2
	 */
	p._onMouseLeave = function(){
		if ( !this.mdown ){
			this.hide();
		}

		this.mleave = true;
	};

	/**
	 * Mouse Down Listener 
	 * @since 2.2
	 */
	p._onMouseDown = function(){
		this.mdown = true;
	};

	/**
	 * Mouse Up Listener 
	 * @since 2.2
	 */
	p._onMouseUp = function(){
		if ( this.mdown && this.mleave ) { 
			this.hide();
		}
		
		this.mdown = false;
	};

	/**
	 * calls by the parent class [MSBaseControl] when the control element visibles [hideUnder option]
	 * @since 1.5.7
	 */
	p.onAppend = function(){
		if( this.needsRealign ){
			this.slider._realignControls();
		}
	};

	/**
	 * calls by the parent class [MSBaseControl] when the control element visibles [hideUnder option]
	 * @since 1.5.7
	 */
	p.onDetach = function(){
		if( this.needsRealign ){
			this.slider._realignControls();
		}
	};
	
	p._hideOnvideoStarts = function(){
		var that = this;
		this.slider.api.addEventListener(MSSliderEvent.VIDEO_PLAY , function(){
   			 that._disableAH = true;
   			 that.hide();
		});
		 
		this.slider.api.addEventListener(MSSliderEvent.VIDEO_CLOSE , function(){
		     that._disableAH = false;
   			 that.visible();
		});
	};
	
	p.hide = function(fast){
		if(fast){
			this.$element.css('opacity' , 0);
			this.$element.css('display' , 'none');
		} else {
			clearTimeout(this.hideTo);
			var $element = this.$element;
			this.hideTo = setTimeout(function(){
				CTween.fadeOut($element , 400 , false);
			}, 20);
		}

		this.$element.addClass('ms-ctrl-hide');
	};
	
	p.visible = function(){
		if(this.detached) return;
		clearTimeout(this.hideTo);
		this.$element.css('display' , '');
		CTween.fadeIn(this.$element , 400 , false);
		this.$element.removeClass('ms-ctrl-hide');
	};
	
	p.destroy = function(){

		if(this.options && this.options.hideUnder){
			//this.slider.api.removeEventListener(MSSliderEvent.RESIZE, this.onResize, this);
			$(window).unbind('resize', this.onResize);
		}
	};
	
	window.BaseControl = BaseControl;
	
})(jQuery);

/* ================== bin-debug/js/pro/uicontrols/Arrows.js =================== */
;(function($){
	
	"use strict";
	
	var MSArrows = function(options){
		BaseControl.call(this);
		$.extend(this.options , options);
	};
	
	MSArrows.extend(BaseControl);
	
	var p = MSArrows.prototype;
	var _super = BaseControl.prototype;
	
	/* -------------------------------- */
	
	p.setup = function(){
		var that = this;
		
		this.$next = $('<div></div>')
					.addClass(this.options.prefix + 'nav-next')
					//.appendTo(this.cont)
					.bind('click' , function(){
							that.slider.api.next(true);
					});
				
		
		this.$prev = $('<div></div>')
					.addClass(this.options.prefix + 'nav-prev')
					//.appendTo(this.cont)
					.bind('click' , function(){
						that.slider.api.previous(true);
					});
		
		_super.setup.call(this);

		this.cont.append(this.$next);
		this.cont.append(this.$prev);

		this.checkHideUnder(); // super method
	};
	
	p.hide = function(fast){
		if(fast){
			this.$prev.css('opacity' , 0).css('display', 'none');
			this.$next.css('opacity' , 0).css('display', 'none');
			return;
		}
	
		CTween.fadeOut(this.$prev , 400 , false);
		CTween.fadeOut(this.$next , 400 , false);
		
		this.$prev.addClass('ms-ctrl-hide');
		this.$next.addClass('ms-ctrl-hide');
	};
	
	p.visible = function(){
		if(this.detached) return;
		CTween.fadeIn(this.$prev , 400 );
		CTween.fadeIn(this.$next , 400 );
		this.$prev.removeClass('ms-ctrl-hide').css('display', '');
		this.$next.removeClass('ms-ctrl-hide').css('display', '');
	};
	
	p.destroy = function(){
		_super.destroy();
		this.$next.remove();
		this.$prev.remove();
	};
	
	window.MSArrows = MSArrows;
	MSSlideController.registerControl('arrows' , MSArrows);
})(jQuery);

/* ================== bin-debug/js/pro/uicontrols/Thumblist.js =================== */
;(function($){
	
	"use strict";
	
	var MSThumblist = function(options){
		BaseControl.call(this);
		
		// default options
		this.options.dir 	= 'h';
		this.options.wheel	= options.dir === 'v';
		this.options.arrows = false;
		this.options.speed  = 17;
		this.options.align  = null;
		this.options.inset = false;
		this.options.margin = 10;
		this.options.space = 10;
		this.options.width = 100;
		this.options.height = 100;
		this.options.type = 'thumbs'; // tabs
		this.options.hover = false;
		
		
		$.extend(this.options , options);
		
		this.thumbs = [];
		this.index_count = 0;
		
		this.__dimen    		= this.options.dir === 'h' ? 'width' : 'height';
		this.__alignsize 		= this.options.dir === 'h' ? 'height' : 'width';
		this.__jdimen    		= this.options.dir === 'h' ? 'outerWidth' : 'outerHeight';
		this.__pos				= this.options.dir === 'h' ? 'left'	 : 'top';		
		
		this.click_enable = true;

	};
	
	MSThumblist.extend(BaseControl);
	
	var p = MSThumblist.prototype;
	var _super = BaseControl.prototype;
	
	/* -------------------------------- */
	
	p.setup = function(){
		this.$element = $('<div></div>')
						.addClass(this.options.prefix + 'thumb-list');

		if(this.options.type === 'tabs'){
			this.$element.addClass(this.options.prefix + 'tabs');
		}
		
		this.$element.addClass('ms-dir-' + this.options.dir);

		_super.setup.call(this);	


		if( this.slider.$controlsCont === this.cont ){
			this.$element.appendTo(this.slider.$element);
		}else{
			this.$element.appendTo(this.cont);
		}
						
		this.$thumbscont = $('<div></div>')
						.addClass('ms-thumbs-cont')
						.appendTo(this.$element);
		
		if(this.options.arrows){
			var that = this;
			this.$fwd = $('<div></div>').addClass('ms-thumblist-fwd').appendTo(this.$element).click(function(){that.controller.push(-15);});
			this.$bwd = $('<div></div>').addClass('ms-thumblist-bwd').appendTo(this.$element).click(function(){that.controller.push(15);});
		}

		// align control
		if( !this.options.insetTo && this.options.align ){
			var align = this.options.align;
			if( this.options.inset ){
				this.$element.css(align, this.options.margin );
			}else if( align === 'top' ){
				this.$element.detach().prependTo(this.slider.$element).css({
					'margin-bottom': this.options.margin,
					'position': 'relative'
				});
			}else if( align === 'bottom' ){
				this.$element.css({
					'margin-top': this.options.margin,
					'position': 'relative'
				});
			}else{
				this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this);
				this.align();
			}

			if( this.options.dir === 'v' ){
				this.$element.width(this.options.width);
			}else{
				this.$element.height(this.options.height);
			}
		}

		this.checkHideUnder(); // super method
	
	};
	
	/**
	 * calls by "RESERVED_SPACE_CHANGE" realigns the control in slider
	 * @since 1.5.7
	 */
	p.align = function(event){
		if( this.detached ){
			return;
		}
		var align = this.options.align;
		var pos = this.slider.reserveSpace(align, this.options[this.__alignsize] + this.options.margin * 2);
		this.$element.css(align, -pos - this.options[this.__alignsize] - this.options.margin);
	};

	p.slideAction = function(slide){
		var thumb_ele = slide.$element.find('.ms-thumb');
		var that = this;
		var thumb_frame = $('<div></div>')
					.addClass('ms-thumb-frame')
					.append(thumb_ele)
					.append($('<div class="ms-thumb-ol"></div>'))
					.bind(this.options.hover? 'hover' : 'click' , function(){that.changeSlide(thumb_frame);});

		if( this.options.align ){
			thumb_frame.width(this.options.width - (this.options.dir === 'v' && this.options.type === 'tabs' ? 12 : 0))  // less arrow size 12px
					.height(this.options.height)
					.css('margin-'+(this.options.dir === 'v' ? 'bottom' : 'right'), this.options.space); 
		}			
					
		thumb_frame[0].index =  this.index_count ++;
		
		this.$thumbscont.append(thumb_frame);
		
		// Added Fillmode support to thumblist
		// @since 1.6.0
		if( this.options.fillMode && thumb_ele.is('img') ){
			var aligner = new window.MSAligner(this.options.fillMode, thumb_frame, thumb_ele);
			thumb_ele[0].aligner = aligner;
			thumb_ele.one('load', function(e){
				var $this = $(this); 
				$this[0].aligner.init($this.width(), $this.height());
				$this[0].aligner.align();
			}).each($.jqLoadFix);
		}

		if($.browser.msie)
				thumb_ele.on('dragstart', function(event) { event.preventDefault(); }); // disable native dragging
				
		this.thumbs.push(thumb_frame);
	};
	
	p.create = function(){
		_super.create.call(this);
		
		this.__translate_end	= window._css3d ? ' translateZ(0px)' : '';
		this.controller 	 = new Controller(0 , 0 , {
			//snapping	     : true,
			snappingMinSpeed : 2,
			friction		 : (100 - this.options.speed * 0.5) / 100
		});
				
		this.controller.renderCallback(this.options.dir === 'h'? this._hMove : this._vMove , this);
		//this.controller.snappingCallback(this.__snapUpdate , this);
		//this.controller.snapCompleteCallback(this.__snapCompelet , this);
		
		var that = this;
		this.resize_listener = function(){that.__resize();};
		$(window).bind('resize', this.resize_listener);
		
		this.thumbSize = this.thumbs[0][this.__jdimen](true);
		
		this.setupSwipe();
		this.__resize();
		
		var that = this;
		if(this.options.wheel){
			
			this.wheellistener = function(event){
				var e = window.event || event.orginalEvent || event;
				var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
				that.controller.push(-delta*10);
				return false;
			};
			
			if($.browser.mozilla) this.$element[0].addEventListener('DOMMouseScroll' , this.wheellistener);
			else this.$element.bind('mousewheel', this.wheellistener);
		}
		
		this.slider.api.addEventListener(MSSliderEvent.CHANGE_START , this.update , this);
		this.slider.api.addEventListener(MSSliderEvent.HARD_UPDATE, this.realignThumbs, this);
		this.cindex =  this.slider.api.index();
		this.select(this.thumbs[this.cindex]);
		
		
	};
	
	p._hMove = function(controller , value){
		this.__contPos = value;
		if(window._cssanim) {
			this.$thumbscont[0].style[window._jcsspfx + 'Transform'] = 'translateX('+-value+'px)'+ this.__translate_end;
			return;
		}
		this.$thumbscont[0].style.left = -value + 'px';
	};
	
	p._vMove = function(controller , value){
		this.__contPos = value;
		if(window._cssanim) {
			this.$thumbscont[0].style[window._jcsspfx + 'Transform'] = 'translateY('+-value+'px)'+ this.__translate_end;
			return;
		}
		this.$thumbscont[0].style.top = -value + 'px';
	};
	
	p.setupSwipe = function(){ 
		this.swipeControl = new averta.TouchSwipe(this.$element);
		this.swipeControl.swipeType = this.options.dir === 'h'? 'horizontal' : 'vertical';
		
		var that = this;
		if(this.options.dir === 'h')
			this.swipeControl.onSwipe = function(status){that.horizSwipeMove(status);};
		else
			this.swipeControl.onSwipe = function(status){that.vertSwipeMove(status);};
	};
	
	p.vertSwipeMove = function(status){
		if(this.dTouch) return;
		var phase = status.phase;
		if(phase === 'start')
			this.controller.stop();	
		else if(phase === 'move')
			this.controller.drag(status.moveY);
		else if(phase === 'end' || phase === 'cancel'){
			var speed = Math.abs(status.distanceY / status.duration * 50/3);
			if(speed > 0.1){
				this.controller.push(-status.distanceY / status.duration * 50/3 );
			}else{
				this.click_enable = true;
				this.controller.cancel();
			} 
		}
	};
	
	p.horizSwipeMove = function(status){
		if(this.dTouch) return;
		var phase = status.phase;
		if(phase === 'start'){
			this.controller.stop();	
			this.click_enable = false;
		}else if(phase === 'move')
			this.controller.drag(status.moveX);
		else if(phase === 'end' || phase === 'cancel'){
			var speed = Math.abs(status.distanceX / status.duration * 50/3);
			if(speed > 0.1){
				 this.controller.push(-status.distanceX / status.duration * 50/3 );
			}else {
				this.click_enable = true;
				this.controller.cancel();
			}
		}
	};
	
	p.update = function(){
		var nindex = this.slider.api.index();
		if(this.cindex === nindex) return;
		
		if(this.cindex != null)this.unselect(this.thumbs[this.cindex]);
		this.cindex = nindex;
		this.select(this.thumbs[this.cindex]);
	
		if(!this.dTouch)this.updateThumbscroll();
	};

	p.realignThumbs = function () {
		this.$element.find('.ms-thumb').each( function (index, thumb) {
			if ( thumb.aligner ) {
				thumb.aligner.align();	
			} 
		} );
	};

	p.updateThumbscroll = function(){
		var thumb_size;
		
		var pos = this.thumbSize * this.cindex;
		
		if(this.controller.value == NaN) this.controller.value = 0;
		
		if(pos -  this.controller.value < 0){
			this.controller.gotoSnap(this.cindex , true);
			return;
		}
				
		if(pos + this.thumbSize - this.controller.value > this.$element[this.__dimen]()){
			var first_snap = this.cindex - Math.floor(this.$element[this.__dimen]() / this.thumbSize) + 1;
			this.controller.gotoSnap(first_snap , true);
			return;
		}
	};

	p.changeSlide = function(thumb){
		if(!this.click_enable || this.cindex === thumb[0].index) return;
		this.slider.api.gotoSlide(thumb[0].index);
	};
	
	p.unselect = function(ele){
		ele.removeClass('ms-thumb-frame-selected');
	};
	
	p.select = function(ele){
		ele.addClass('ms-thumb-frame-selected');
	};
	
	p.__resize = function(){
		var size = this.$element[this.__dimen]();

		if(this.ls === size) return;
		
		this.ls = size;
		
		this.thumbSize = this.thumbs[0][this.__jdimen](true);
		var len = this.slider.api.count() * this.thumbSize;
		this.$thumbscont[0].style[this.__dimen] = len + 'px';
		
		if(len <= size){
			this.dTouch = true;
			this.controller.stop();
			this.$thumbscont[0].style[this.__pos] = (size - len)*.5 + 'px';
			this.$thumbscont[0].style[window._jcsspfx + 'Transform'] = '';			
		}else{
			this.dTouch = false;
			this.click_enable = true;
			this.$thumbscont[0].style[this.__pos] = '';
			this.controller._max_value = len - size;
			this.controller.options.snapsize = this.thumbSize;
			this.updateThumbscroll();
		}
		
	};
	
	p.destroy = function(){
		_super.destroy();
		
		if(this.options.wheel){
			if($.browser.mozilla) this.$element[0].removeEventListener('DOMMouseScroll' , this.wheellistener);
			else this.$element.unbind('mousewheel', this.wheellistener);
			this.wheellistener = null;
		}		
		
		$(window).unbind('resize', this.resize_listener);

		this.$element.remove();

		this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this);
		this.slider.api.removeEventListener(MSSliderEvent.CHANGE_START , this.update , this);
	};
	
	window.MSThumblist = MSThumblist;
	MSSlideController.registerControl('thumblist' , MSThumblist);
	
})(jQuery);

/* ================== bin-debug/js/pro/uicontrols/Bullets.js =================== */
;(function($){
	
	"use strict";
	
	var MSBulltes = function(options){
		BaseControl.call(this);
		
		this.options.dir 	= 'h';
		this.options.inset  = true;
		this.options.margin = 10;
		this.options.space = 10;
		

		$.extend(this.options , options);
		
		this.bullets = [];
		
	};
	
	MSBulltes.extend(BaseControl);
	
	var p = MSBulltes.prototype;
	var _super = BaseControl.prototype;
	
	/* -------------------------------- */
	
	p.setup = function(){
		_super.setup.call(this);

		this.$element = $('<div></div>')
						.addClass(this.options.prefix + 'bullets')
						.addClass('ms-dir-' + this.options.dir)
						.appendTo(this.cont);
		
		this.$bullet_cont = $('<div></div>')
						.addClass('ms-bullets-count')
						.appendTo(this.$element);

		if( !this.options.insetTo && this.options.align ){

			var align = this.options.align;
			if( this.options.inset ){
				this.$element.css(align, this.options.margin);
			}

		}

		this.checkHideUnder(); // super method
	};
	
	p.create = function(){
		_super.create.call(this);
		var that = this;
									
		this.slider.api.addEventListener(MSSliderEvent.CHANGE_START , this.update , this);
		this.cindex =  this.slider.api.index();
		for(var i = 0; i < this.slider.api.count(); ++i){
			var bullet = $('<div></div>').addClass('ms-bullet');
			bullet[0].index = i;
			bullet.on('click', function(){that.changeSlide(this.index);});
			this.$bullet_cont.append(bullet);
			this.bullets.push(bullet);
			if( this.options.dir === 'h' ) {
				bullet.css('margin', this.options.space/2);
			}else {
				bullet.css('margin', this.options.space);
			}
		}
		
		if(this.options.dir === 'h') {
			this.$element.width(bullet.outerWidth(true) * this.slider.api.count());
		} else {
			this.$element.css('margin-top', -this.$element.outerHeight(true)/2);
		}
		
		this.select(this.bullets[this.cindex]);
	};
	
	p.update = function(){
		var nindex = this.slider.api.index();
		if(this.cindex === nindex) return;
		
		if(this.cindex != null)this.unselect(this.bullets[this.cindex]);
		this.cindex = nindex;
		this.select(this.bullets[this.cindex]);
	};
	
	p.changeSlide = function(index){
		if(this.cindex === index) return;
		this.slider.api.gotoSlide(index);
	};
	
	p.unselect = function(ele){
		ele.removeClass('ms-bullet-selected');
	};
	
	p.select = function(ele){
		ele.addClass('ms-bullet-selected');
	};
	
	p.destroy = function(){
		_super.destroy();
		this.slider.api.removeEventListener(MSSliderEvent.CHANGE_START , this.update , this);
		this.$element.remove();
	};
	
	window.MSBulltes = MSBulltes;
	
	MSSlideController.registerControl('bullets' , MSBulltes);
	
})(jQuery);

/* ================== bin-debug/js/pro/uicontrols/Scrollbar.js =================== */
;(function($){
	
	"use strict";
	
	var MSScrollbar = function(options){
		BaseControl.call(this);
		
		this.options.dir 		= 'h';
		this.options.autohide	= true;
		this.options.width 		= 4;
		this.options.color 		= '#3D3D3D';
		this.options.margin		= 10;
		
		$.extend(this.options , options);
		this.__dimen    		= this.options.dir === 'h' ? 'width' : 'height';
		this.__jdimen    		= this.options.dir === 'h' ? 'outerWidth' : 'outerHeight';
		this.__pos				= this.options.dir === 'h' ? 'left'	 : 'top';
		this.__translate_end	= window._css3d ? ' translateZ(0px)' : '';
		this.__translate_start	= this.options.dir === 'h' ? ' translateX(' : 'translateY(';
	};
	
	MSScrollbar.extend(BaseControl);
	
	var p = MSScrollbar.prototype;
	var _super = BaseControl.prototype;
	
	/* -------------------------------- */
	
	p.setup = function(){

		this.$element = $('<div></div>')
						.addClass(this.options.prefix + 'sbar')
						.addClass('ms-dir-' + this.options.dir);
						
		_super.setup.call(this);
	
		if( this.slider.$controlsCont === this.cont ){
			this.$element.appendTo(this.slider.$element);
		}else{
			this.$element.appendTo(this.cont);
		}

		this.$bar = $('<div></div>')
					.addClass(this.options.prefix + 'bar')
					.appendTo(this.$element);
					
		if(this.slider.options.loop){
			console.log('WARNING, MSScrollbar cannot work with looped slider.');
			this.disable = true;
			this.$element.remove();
		}
		
		/**
		 * align control
		 * @since 1.5.7
		 */
		// change width 
		if( this.options.dir === 'v' ){
			this.$bar.width(this.options.width);
		} else {
			this.$bar.height(this.options.width);
		}

		// change color
		this.$bar.css('background-color', this.options.color);

		if( !this.options.insetTo && this.options.align ){
			
			// reset old versions styles
			if( this.options.dir === 'v' ){
				this.$element.css({
					right:'auto',
					left:'auto'
				});
			} else {
				this.$element.css({
					top:'auto',
					bottom:'auto'
				});
			}

			var align = this.options.align;
			if( this.options.inset ){
				this.$element.css(align, this.options.margin );
			}else if( align === 'top' ){
				this.$element.prependTo(this.slider.$element).css({
					'margin-bottom': this.options.margin,
					'position': 'relative'
				});
			}else if( align === 'bottom' ){
				this.$element.css({
					'margin-top': this.options.margin,
					'position': 'relative'
				});
			}else{
				this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this);
				this.align();
			}
		}

		this.checkHideUnder(); // super method
	};

	/**
	 * calls by "RESERVED_SPACE_CHGANE" realigns the control in slider
	 * @since 1.5.7
	 */
	p.align = function(event){
		if( this.detached ){
			return;
		}

		var align = this.options.align;
		var pos = this.slider.reserveSpace(align, this.options.margin * 2 + this.options.width);
		this.$element.css(align, -pos - this.options.margin - this.options.width);
	};
	
	p.create = function(){
		
		if(this.disable) return;
		
		//_super.create.call(this);
		var that = this;
		
		this.scroller = this.slider.api.scroller;
		
		this.slider.api.view.addEventListener(MSViewEvents.SCROLL , this._update , this);		
		this.slider.api.addEventListener(MSSliderEvent.RESIZE , this._resize , this);
		
		this._resize();
		
		if(this.options.autohide){
			this.$bar.css('opacity' , '0');
		}
	};
	
	p._resize = function(){
		this.vdimen = this.$element[this.__dimen]();
		this.bar_dimen = this.slider.api.view[ '__' + this.__dimen] * this.vdimen / this.scroller._max_value; 
		this.$bar[this.__dimen](this.bar_dimen );
	};
	
	p._update = function(){
		var value = this.scroller.value * (this.vdimen - this.bar_dimen) / this.scroller._max_value;
		if(this.lvalue === value) return;
		this.lvalue = value;
		
		if(this.options.autohide){
			clearTimeout(this.hto);
			this.$bar.css('opacity' , '1');
			
			var that = this;
			this.hto = setTimeout(function(){
				//if(!that.slider.api.view.swipeControl.touchStarted)
				that.$bar.css('opacity' , '0');
			} , 150);
		}
		
		if(value < 0){
			this.$bar[0].style[this.__dimen] = this.bar_dimen + value + 'px';
			return;
		}
		
		if(value > this.vdimen - this.bar_dimen)
			this.$bar[0].style[this.__dimen] = this.vdimen - value + 'px';

		if(window._cssanim) {
			this.$bar[0].style[window._jcsspfx + 'Transform'] = this.__translate_start +value+'px)'+ this.__translate_end;
			return;
		}
		
		this.$bar[0].style[this.__pos] = value + 'px';
		
	};
	
	p.destroy = function(){
		_super.destroy();
		this.slider.api.view.removeEventListener(MSViewEvents.SCROLL , this._update , this);		
		this.slider.api.removeEventListener(MSSliderEvent.RESIZE , this._resize , this);
		this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this);

		this.$element.remove();
	};
	
	window.MSScrollbar = MSScrollbar;
	MSSlideController.registerControl('scrollbar' , MSScrollbar);
})(jQuery);

/* ================== bin-debug/js/pro/uicontrols/Timebar.js =================== */
;(function($){
	
	"use strict";
	
	var MSTimerbar = function(options){
		BaseControl.call(this);

		this.options.autohide = false;
		this.options.width 		= 4;
		this.options.color 		= '#FFFFFF';
		this.options.inset 		= true;
		this.options.margin 	= 0;

		$.extend(this.options , options);
	};
	
	MSTimerbar.extend(BaseControl);
	
	var p = MSTimerbar.prototype;
	var _super = BaseControl.prototype;
	
	/* -------------------------------- */
	
	p.setup = function(){
		var that = this;
		_super.setup.call(this);
		
		this.$element = $('<div></div>')
					.addClass(this.options.prefix + 'timerbar');
		
		_super.setup.call(this);
	
		if( this.slider.$controlsCont === this.cont ){
			this.$element.appendTo(this.slider.$element);
		}else{
			this.$element.appendTo(this.cont);
		}

		this.$bar = $('<div></div>')
					.addClass('ms-time-bar')
					.appendTo(this.$element);

		// change width 
		if( this.options.dir === 'v' ){
			this.$bar.width(this.options.width);
			this.$element.width(this.options.width);
		} else {
			this.$bar.height(this.options.width);
			this.$element.height(this.options.width);
		}

		// change color
		this.$bar.css('background-color', this.options.color);
		
		if( !this.options.insetTo && this.options.align ){
			
			this.$element.css({
				top:'auto',
				bottom:'auto'
			});

			var align = this.options.align;
			if( this.options.inset ){
				this.$element.css(align, this.options.margin );
			}else if( align === 'top' ){
				this.$element.prependTo(this.slider.$element).css({
					'margin-bottom': this.options.margin,
					'position': 'relative'
				});
			}else if( align === 'bottom' ){
				this.$element.css({
					'margin-top': this.options.margin,
					'position': 'relative'
				});
			}else{
				this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this);
				this.align();
			}
		}

		this.checkHideUnder(); // super method
		
	};

	/**
	 * calls by "RESERVED_SPACE_CHGANE" realigns the control in slider
	 * @since 1.5.7
	 */
	p.align = function(event){
		if( this.detached ){
			return;
		}

		var align = this.options.align;
		var pos = this.slider.reserveSpace(align, this.options.margin * 2 + this.options.width);
		this.$element.css(align, -pos - this.options.margin - this.options.width);
	};
	
	p.create = function(){
		_super.create.call(this);
		this.slider.api.addEventListener(MSSliderEvent.WAITING , this._update , this);
		this._update();
	};
	
	p._update = function(){
		this.$bar[0].style.width = this.slider.api._delayProgress  + '%';
	};
	
	p.destroy = function(){
		_super.destroy();
		this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this);
		this.slider.api.removeEventListener(MSSliderEvent.WAITING , this._update , this);
		this.$element.remove();
	};
	
	window.MSTimerbar = MSTimerbar;
	MSSlideController.registerControl('timebar' , MSTimerbar);
})(jQuery);

/* ================== bin-debug/js/pro/uicontrols/CircleTimer.js =================== */
;(function($){
	
	"use strict";
	
	var MSCircleTimer = function(options){
		BaseControl.call(this);
		
		this.options.color 	= '#A2A2A2';
		this.options.stroke = 10;
		this.options.radius	= 4;
		
		this.options.autohide = false;
		$.extend(this.options , options);
	};
	
	MSCircleTimer.extend(BaseControl);
	
	var p = MSCircleTimer.prototype;
	var _super = BaseControl.prototype;
	
	/* -------------------------------- */
	
	p.setup = function(){
		var that = this;
		_super.setup.call(this);
		
		this.$element = $('<div></div>')
					.addClass(this.options.prefix + 'ctimer')
					.appendTo(this.cont);
					
		this.$canvas = 	$('<canvas></canvas>')
					.addClass('ms-ctimer-canvas')
					.appendTo(this.$element);		
		
		this.$bar = $('<div></div>')
					.addClass('ms-ctimer-bullet')
					.appendTo(this.$element);
		
		if(!this.$canvas[0].getContext){
			this.destroy();
			this.disable = true;
			return;
		}
		
		
		this.ctx		= this.$canvas[0].getContext('2d');
		this.prog		= 0;
		
		this.__w = (this.options.radius + this.options.stroke/2) * 2;
		this.$canvas[0].width  = this.__w;
		this.$canvas[0].height = this.__w;

		this.checkHideUnder(); // super method
	};
	
	p.create = function(){
		if(this.disable) return;
		_super.create.call(this);
		this.slider.api.addEventListener(MSSliderEvent.WAITING , this._update , this);
		
		var that = this;
		this.$element.click(function(){
			if(that.slider.api.paused)
				that.slider.api.resume();
			else
				that.slider.api.pause();
		});
		
		this._update();
	};
	
	p._update = function(){
		var that = this;
		$(this).stop(true).animate({prog:this.slider.api._delayProgress * 0.01} ,
					 	{duration:200 , step:function(){that._draw();}});
		//this.$bar[0].style.width = this.slider.api._delayProgress/100 * this.$element.width() + 'px';
	};
	
	p._draw = function(){
		this.ctx.clearRect(0 , 0,  this.__w ,  this.__w);
		this.ctx.beginPath(); 
		this.ctx.arc(this.__w * .5 , this.__w * .5 ,this.options.radius , Math.PI * 1.5 , Math.PI * 1.5 + 2 * Math.PI * this.prog, false);
		this.ctx.strokeStyle = this.options.color;
		this.ctx.lineWidth = this.options.stroke;
		this.ctx.stroke();
	};
	
	p.destroy = function(){
		_super.destroy();
		if(this.disable) return;
		$(this).stop(true);
		this.slider.api.removeEventListener(MSSliderEvent.WAITING , this._update , this);
		this.$element.remove();
	};
	
	window.MSCircleTimer = MSCircleTimer;
		MSSlideController.registerControl('circletimer' , MSCircleTimer);
})(jQuery);

/* ================== bin-debug/js/pro/uicontrols/Lightbox.js =================== */
;(function($){
	
	"use strict";
	
	window.MSLightbox = function(options){
		BaseControl.call(this , options);
		
		this.options.autohide	= false;
		$.extend(this.options , options);

		this.data_list = [];
	};
	MSLightbox.fadeDuratation = 400;
	MSLightbox.extend(BaseControl);
	
	var p = MSLightbox.prototype;
	var _super = BaseControl.prototype;
	
	/* -------------------------------- */	
	p.setup = function(){
		_super.setup.call(this);

		this.$element = $('<div></div>')
						.addClass(this.options.prefix + 'lightbox-btn')
						.appendTo(this.cont);
		
		this.checkHideUnder(); // super method
	};
	
	p.slideAction = function(slide){
		 $('<div></div>')
						.addClass(this.options.prefix + 'lightbox-btn')
						.appendTo(slide.$element)
						.append($(slide.$element.find('.ms-lightbox')));
	
	};
	
	p.create = function(){
		_super.create.call(this);
	
	};
	

	MSSlideController.registerControl('lightbox' , MSLightbox);
})(jQuery);

/* ================== bin-debug/js/pro/uicontrols/SlideInfo.js =================== */
;(function($){
	
	"use strict";
	
	window.MSSlideInfo = function(options){
		BaseControl.call(this , options);
		
		this.options.autohide	= false;
		this.options.align  = null;
		this.options.inset = false;
		this.options.margin = 10;
		this.options.size = 100;
		this.options.dir = 'h';

		$.extend(this.options , options);

		this.data_list = [];
	};
	MSSlideInfo.fadeDuratation = 400;
	MSSlideInfo.extend(BaseControl);
	
	var p = MSSlideInfo.prototype;
	var _super = BaseControl.prototype;
	
	/* -------------------------------- */	
	p.setup = function(){
		this.$element = $('<div></div>')
						.addClass(this.options.prefix + 'slide-info')
						.addClass('ms-dir-' + this.options.dir);

		_super.setup.call(this);	

		if( this.slider.$controlsCont === this.cont ){
			this.$element.appendTo(this.slider.$element); // insert in outer container out of overflow hidden
		}else{
			this.$element.appendTo(this.cont);
		}
		
		// align control
		if( !this.options.insetTo && this.options.align ){
			var align = this.options.align;
			if( this.options.inset ){
				this.$element.css(align, this.options.margin );
			}else if( align === 'top' ){
				this.$element.prependTo(this.slider.$element).css({
					'margin-bottom': this.options.margin,
					'position': 'relative'
				});
			}else if( align === 'bottom' ){
				this.$element.css({
					'margin-top': this.options.margin,
					'position': 'relative'
				});
			}else{
				this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this);
				this.align();
			}

			if( this.options.dir === 'v' ){
				this.$element.width(this.options.size);
			}else{
				this.$element.css('min-height', this.options.size);
			}
		}

		this.checkHideUnder(); // super method
	};

	/**
	 * calls by "RESERVED_SPACE_CHGANE" realigns the control in slider
	 * @since 1.5.7
	 */
	p.align = function(event){
		if( this.detached ){
			return;
		}
		var align = this.options.align;
		var pos = this.slider.reserveSpace(align, this.options.size + this.options.margin * 2);
		this.$element.css(align, -pos - this.options.size - this.options.margin);
	};
	
	p.slideAction = function(slide){
		var info_ele = $(slide.$element.find('.ms-info'));
		var that = this;
		info_ele.detach();
		
		this.data_list[slide.index] = info_ele;
	};
	
	p.create = function(){
		_super.create.call(this);
		this.slider.api.addEventListener(MSSliderEvent.CHANGE_START , this.update , this);
		this.cindex =  this.slider.api.index();
		this.switchEle(this.data_list[this.cindex]);
	};
	
	p.update = function(){
		var nindex = this.slider.api.index();
		this.switchEle(this.data_list[nindex]);
		this.cindex = nindex;
	};
	
	p.switchEle = function(ele){
		if(this.current_ele){
			var that = this;
			
			if(this.current_ele[0].tween)this.current_ele[0].tween.stop(true);
			this.current_ele[0].tween = CTween.animate(this.current_ele , MSSlideInfo.fadeDuratation  , {opacity:0} , {complete:function(){
				this.detach();
				this[0].tween = null; 
				ele.css('position', 'relative');
			} , target:this.current_ele });

			//this.current_ele.css('position', 'absolute');			
			ele.css('position', 'absolute');
		}

		this.__show(ele);
	};
	
	p.__show = function(ele){
		ele.appendTo(this.$element).css('opacity','0');///.css('position', 'relative');
		
		// calculate max height
		if ( this.current_ele ){
			ele.height( Math.max( ele.height(), this.current_ele.height() ) );
		}

		clearTimeout(this.tou);
		this.tou = setTimeout(function(){
			CTween.fadeIn(ele , MSSlideInfo.fadeDuratation );
			ele.css('height', '');	
		}, MSSlideInfo.fadeDuratation);


		if(ele[0].tween)ele[0].tween.stop(true);
		this.current_ele = ele;
	};

	p.destroy = function(){
		_super.destroy();
		clearTimeout(this.tou);
		if(this.current_ele && this.current_ele[0].tween){
			this.current_ele[0].tween.stop('true');
		}
		this.$element.remove();
		this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this);
		this.slider.api.removeEventListener(MSSliderEvent.CHANGE_START , this.update , this);
	};
	
	MSSlideController.registerControl('slideinfo' , MSSlideInfo);
})(jQuery);

/* ================== bin-debug/js/pro/plugins/MSGallery.js =================== */
/**
 *	Master Slider, Gallery Template v1.0
 * 	@author: Averta Ltd.
 */

;(function($){
	
	window.MSGallery = function(id , slider){
		this.id = id;
		this.slider = slider;
		
		this.telement = $('#'+id);
		
		this.botcont = $('<div></div>').addClass('ms-gallery-botcont').appendTo(this.telement);
		this.thumbcont = $('<div></div>').addClass('ms-gal-thumbcont hide-thumbs').appendTo(this.botcont);
		this.playbtn  = $('<div></div>').addClass('ms-gal-playbtn').appendTo(this.botcont);
		this.thumbtoggle  = $('<div></div>').addClass('ms-gal-thumbtoggle').appendTo(this.botcont);
		
		// adds required controls to slider
		slider.control('thumblist' , {insertTo:this.thumbcont , autohide:false , dir:'h'});
		slider.control('slidenum'  , {insertTo:this.botcont , autohide:false});
		slider.control('slideinfo' , {insertTo:this.botcont , autohide:false});		
		slider.control('timebar'   , {insertTo:this.botcont , autohide:false});		
		slider.control('bullets'   , {insertTo:this.botcont , autohide:false});		
	};
	
	var p = MSGallery.prototype;
	
	p._init = function(){
		var that = this;
		
		if(!this.slider.api.paused)
			 this.playbtn.addClass('btn-pause');
		 
		this.playbtn.click(function(){
			if(that.slider.api.paused){
				 that.slider.api.resume();
				 that.playbtn.addClass('btn-pause');
			}else{
				 that.slider.api.pause();
				 that.playbtn.removeClass('btn-pause');
			}
		});
		
		
		this.thumbtoggle.click(function(){
			
			if(that.vthumbs){
				//that.hideThumbs();
				that.thumbtoggle.removeClass('btn-hide');
				that.vthumbs = false;
				that.thumbcont.addClass('hide-thumbs');
			}else{
				//that.showThumbs();
				that.thumbtoggle.addClass('btn-hide');
				that.thumbcont.removeClass('hide-thumbs');
				that.vthumbs = true;
			}
		});
		
	};
	
	p.setup = function(){
		var that = this;
		$(document).ready(function(){that._init();});
	};
	
	
})(jQuery);

/* ================== bin-debug/js/pro/plugins/MSFlickrV2.js =================== */
/**
 * Master Slider Flickr Plugin Version 2
 * @version 2.0.0
 * @author Averta Ltd.
 */
;(function($){
	
	/**
	 * Generate Flickr photoset url
	 * @param  {String} key   api key
	 * @param  {String} id    photoset id
	 * @param  {Number} count number of images
	 * @return {String}
	 */
	var getPhotosetURL = function(key , id , count){
		return 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + key + '&photoset_id='+ id +'&per_page='+ count +'&extras=url_o,description,date_taken,owner_name,views&format=json&jsoncallback=?';
	};
	
	/**
	 * Generate Flickr user public images url
	 * @param  {String} key   api key
	 * @param  {String} id    user id
	 * @param  {Number} count number of images
	 * @return {String}
	 */
	var getUserPublicURL = function(key , id , count){
		return 'https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=' + key + '&user_id='+ id +'&per_page='+ count +'&extras=url_o,description,date_taken,owner_name,views&format=json&jsoncallback=?';
	};
	
	/**
	 * Generates image path
	 * @param  {String} fid    
	 * @param  {String} server 
	 * @param  {String} id     
	 * @param  {String} secret 
	 * @param  {String} size   
	 * @return {String}        
	 */
	var getImageSource = function(fid , server , id , secret , size, data){
		if ( size === '_o' && data ) {
			return data.url_o;
		}

		return 'https://farm' + fid + '.staticflickr.com/'+ server + '/' + id + '_' + secret + size + '.jpg';
	};

	window.MSFlickrV2 = function(slider,options){
		var _options = {
			count			:10,
			type			:'photoset',
			/*
			 * s small square 75x75 
			 * q large square 150x150 
			 * t thumbnail, 100 on longest side
			 */ 
			thumbSize	:'q',  
			
			/*
			 * -	medium, 500 on longest side
			 * z	medium 640, 640 on longest side
			 * c	medium 800, 800 on longest side
			 * b	large, 1024 on longest side
			 * o	original image, either a jpg, gif or png, depending on source format
			 */
			imgSize		: 'c'
		};

		this.slider = slider;
		this.slider.holdOn();
		
		if( !options.key ){
			this.errMsg('Flickr API Key required. Please add it in settings.');
			return;
		}
		
		$.extend(_options , options);
		this.options = _options;
		
		var that = this;
		
		if(this.options.type === 'photoset'){
			$.getJSON(getPhotosetURL(this.options.key , this.options.id , this.options.count) , function(data){
				that._photosData(data);
			});
		}else{
			$.getJSON(getUserPublicURL(this.options.key , this.options.id , this.options.count) , function(data){
				that.options.type = 'photos';
				that._photosData(data);
			});
		}
		
		if(this.options.imgSize !== '' && this.options.imgSize !== '-') 
			this.options.imgSize = '_' + this.options.imgSize;
			
		this.options.thumbSize = '_' + this.options.thumbSize;
		
		// grab slide template from slider markup
		this.slideTemplate = this.slider.$element.find('.ms-slide')[0].outerHTML;
		this.slider.$element.find('.ms-slide').remove(); // remove all slides from slider markup
	};

	var p = MSFlickrV2.prototype;

	p._photosData = function(data){
		
		if(data.stat === 'fail'){
			this.errMsg('Flickr API ERROR#' + data.code + ': ' + data.message);
			return;
		}
		
		var that = this;
		var getInfo = this.options.author || this.options.desc;
		$.each(data[this.options.type].photo, function(i,item){

			var slide_cont = that.slideTemplate.replace(/{{[\w-]+}}/g, function(match){
				match = match.replace(/{{|}}/g, '');
				if( shortCodes[match] ) {
					return shortCodes[match](item, that);
				} else {
					return '{{'+match+'}}';
				}

			});

			$(slide_cont).appendTo(that.slider.$element);

		});
		
		that._initSlider();
	};
	
	p.errMsg = function(msg){
		this.slider.$element.css('display', 'block');
		if(!this.errEle)
			this.errEle = $('<div style="font-family:Arial; color:red; font-size:12px; position:absolute; top:10px; left:10px"></div>').appendTo(this.slider.$loading);
		
		this.errEle.html(msg);
	};
	
	p._initSlider = function(){
		this.slider.release();
	};

	// a list of functions that generates data from short codes
	var shortCodes = {
		'image': function(data, that){
			return getImageSource(data.farm , data.server , data.id , data.secret , that.options.imgSize, data);
		},

		'thumb': function(data, that){
			return getImageSource(data.farm , data.server , data.id , data.secret , that.options.thumbSize);
		},

		'title': function(data, that){
			return data.title;
		},

		'owner-name': function(data, that){
			return data.ownername;
		},

		'date-taken': function(data, that){
			return data.datetaken;
		},

		'views': function(data, that){
			return data.views;
		},

		'description': function(data, that){
			return data.description._content;
		}
	};

})(jQuery);

/* ================== bin-debug/js/pro/plugins/MSFacebookGallery.js =================== */
/**
 * Master Slider Facebook Gallery plugin
 * @author Averta Ltd.
 * @version 1.0.0
 */
;(function($){


	window.MSFacebookGallery = function(slider, options){
		var _options = {
			count			:10,
			type			:'photostream', // album
 			/*
 			orginal/960/720/600/480/320/130
 			 */
			thumbSize	:'320',

			/*
 			orginal/960/720/600/480/320/130
 			 */
			imgSize		: 'orginal',

			https: false,
            token: ''
		};

		this.slider = slider;
		this.slider.holdOn();

		$.extend(_options , options);
		this.options = _options;

        //this.graph = this.options.https ? 'https://graph.facebook.com' : 'http://graph.facebook.com';
		this.graph = 'https://graph.facebook.com';

		var that = this;

		if(this.options.type === 'photostream'){
			$.getJSON(this.graph + '/' + this.options.username + '/photos/uploaded/?fields=source,name,link,images,from&limit=' + this.options.count + '&access_token=' + this.options.token , function(data){
				that._photosData(data);
			});
		}else{
			$.getJSON(this.graph + '/' + this.options.albumId + '/photos?fields=source,name,link,images,from&limit=' + this.options.count + '&access_token=' + this.options.token , function(data){
				that._photosData(data);
			});
		}

		// grab slide template from slider markup
		this.slideTemplate = this.slider.$element.find('.ms-slide')[0].outerHTML;
		this.slider.$element.find('.ms-slide').remove(); // remove all slides from slider markup
	};

	var p = MSFacebookGallery.prototype;

	p._photosData = function(content){

		if(content.error){
			this.errMsg('Facebook API ERROR#' + content.error.code + '(' + content.error.type + ')' + ': ' + content.error.message);
			return;
		}

		var that = this;
		var getInfo = this.options.author || this.options.desc;

		for(var i=0,l=content.data.length;i!==l;i++){

			var slide_cont = that.slideTemplate.replace(/{{[\w-]+}}/g, function(match){
				match = match.replace(/{{|}}/g, '');
				if( shortCodes[match] ) {
					return shortCodes[match](content.data[i], that);
				} else {
					return '{{'+match+'}}';
				}

			});

			$(slide_cont).appendTo(that.slider.$element);
		}

		that._initSlider();
	};

	p.errMsg = function(msg){
		this.slider.$element.css('display', 'block');
		if(!this.errEle)
			this.errEle = $('<div style="font-family:Arial; color:red; font-size:12px; position:absolute; top:10px; left:10px"></div>').appendTo(this.slider.$loading);

		this.errEle.html(msg);
	};

	p._initSlider = function(){
		this.slider.release();
	};

	var getImageSource = function(images, size){

		if( size === 'orginal' ) {
			return images[0].source;
		}

		for(var i = 0, l = images.length; i !== l; i++){
			if( images[i].source.indexOf(size + 'x' + size) !== -1 )
				return images[i].source;
		}
      //  console.log(images)
		return images[0].source;
	};

	// a list of functions that generates data from short codes
	var shortCodes = {
		'image': function(data, that){

			return getImageSource(data.images, that.options.imgSize);
		},

		'thumb': function(data, that){
			return getImageSource(data.images, that.options.thumbSize);
		},

		'name': function(data, that){
			return data.name;
		},

		'owner-name': function(data, that){
			return data.from.name;
		},

		'link': function(data, that){
			return data.link;
		}
	};

})(jQuery);

/* ================== bin-debug/js/pro/plugins/MSScrollParallax.js =================== */
/**
 * Master Slider Parallax Layers Fade
 * @description Moves and fades layers of current slide while scrolling window.
 * @package MasterSlider
 * @author Averta
 * @since v1.8.0
 */

(function($){

	'use strict';

	window.MSScrollParallax = function (slider, parallax, bgparallax, fade) {
		this.fade = fade;
		this.slider = slider;
		this.parallax = parallax/100;
		this.bgparallax = bgparallax/100;

		slider.api.addEventListener(MSSliderEvent.INIT, this.init, this);
		slider.api.addEventListener(MSSliderEvent.DESTROY, this.destory, this);	
		slider.api.addEventListener(MSSliderEvent.CHANGE_END, this.resetLayers, this);
		slider.api.addEventListener(MSSliderEvent.CHANGE_START, this.updateCurrentSlide, this);
	};

	window.MSScrollParallax.setup = function(slider, parallax, bgparallax, fade){
		// disable in mobile devices
		if ( window._mobile ) {
			return;
		}

		if( parallax == null ) {
			parallax = 50;
		}
		
		if( bgparallax == null ){
			bgparallax = 40;
		}

		return new MSScrollParallax(slider, parallax, bgparallax, fade); 
	};

	var p = window.MSScrollParallax.prototype;

	p.init = function (e) {
		this.slider.$element.addClass('ms-scroll-parallax');
		this.sliderOffset = this.slider.$element.offset().top;
		this.updateCurrentSlide();
		// wrap layers element
		var slides = this.slider.api.view.slideList,
			slide;
		for(var i = 0, l = slides.length; i!==l ; i++) {
			slide = slides[i];
			if( slide.hasLayers ) {
				slide.layerController.$layers.wrap('<div class="ms-scroll-parallax-cont"></div>');
				slide.$scrollParallaxCont = slide.layerController.$layers.parent();
			}
		}
		
		$(window).on('scroll', {that:this}, this.moveParallax).trigger('scroll');
	};

	p.resetLayers = function (e) {
		if( !this.lastSlide ) {
			return;
		}

		var layers = this.lastSlide.$scrollParallaxCont;

		if ( window._css2d ) {
			if( layers ){
				layers[0].style[window._jcsspfx + 'Transform'] = '';
			}

			if ( this.lastSlide.hasBG ) {
				this.lastSlide.$imgcont[0].style[window._jcsspfx + 'Transform'] = '';
			}

		} else {
			if( layers ){
				layers[0].style.top = '';
			}

			if ( this.lastSlide.hasBG ) {
				this.lastSlide.$imgcont[0].style.top = '0px';
			}
		}
	};

	p.updateCurrentSlide = function (e) {
		this.lastSlide = this.currentSlide;

		this.currentSlide = this.slider.api.currentSlide;
		this.moveParallax({data:{that:this}});
	};

	p.moveParallax = function (e) {
		var that = e.data.that,
			slider = that.slider,
			offset = that.sliderOffset,
			scrollTop = $(window).scrollTop(),
			layers = that.currentSlide.$scrollParallaxCont,
			out = offset - scrollTop;

		if( out <= 0 ) {
			
			if( layers ){
				if ( window._css3d ) {
					layers[0].style[window._jcsspfx + 'Transform'] = 'translateY(' + -out * that.parallax + 'px) translateZ(0.4px)';
				} else if ( window._css2d ){
					layers[0].style[window._jcsspfx + 'Transform'] = 'translateY(' + -out * that.parallax + 'px)';
				} else {
					layers[0].style.top =  -out * that.parallax + 'px';
				}
			}
			
			that.updateSlidesBG(-out * that.bgparallax + 'px', true);

			if ( layers && that.fade ) { 
				layers.css('opacity',  (1 - Math.min(1, -out / slider.api.height)) );
			}

		} else {
			if( layers ){
				if ( window._css2d ) {
					layers[0].style[window._jcsspfx + 'Transform'] = '';
				} else {
					layers[0].style.top = '';
				}
			}

			that.updateSlidesBG('0px', false);

			if ( layers && that.fade ) { 
				layers.css('opacity',  1 );
			}

		}

	};

	p.updateSlidesBG = function(pos, fixed) {
		var slides = this.slider.api.view.slideList,
			position = ( fixed &&  !$.browser.msie && !$.browser.opera ? 'fixed' : '');

		for(var i = 0, l = slides.length; i!==l ; i++) {
			if ( slides[i].hasBG ) {
				slides[i].$imgcont[0].style.position = position; 
				slides[i].$imgcont[0].style.top = pos;
			}

			if ( slides[i].$bgvideocont ){
				slides[i].$bgvideocont[0].style.position = position; 
				slides[i].$bgvideocont[0].style.top = pos;
			}
		}

	};

	p.destory = function () {
		slider.api.removeEventListener(MSSliderEvent.INIT, this.init, this);
		slider.api.removeEventListener(MSSliderEvent.DESTROY, this.destory, this);	
		slider.api.removeEventListener(MSSliderEvent.CHANGE_END, this.resetLayers, this);
		slider.api.removeEventListener(MSSliderEvent.CHANGE_START, this.updateCurrentSlide, this);
		$(window).off('scroll', this.moveParallax);
	};

})(jQuery);

/* ================== bin-debug/js/pro/plugins/MSKeyboardNav.js =================== */
/**
 * Keyboard navigation plugin for Master Slider.
 * @version  1.0.0
 * @author Averta
 * @package MasterSlider jQuery
 */
;(function($, document, window){
	var PId = 0;

	// check if master slider is available
	if ( !window.MasterSlider ) {
		return;
	}

	var KeyboardNav = function ( slider ) {
		this.slider = slider;
		this.PId = PId++;

		if ( this.slider.options.keyboard ) {
			slider.api.addEventListener(MSSliderEvent.INIT, this.init, this);
		}
	};

	KeyboardNav.name = 'MSKeyboardNav';
	var p = KeyboardNav.prototype;

	/**
	 * initiate the plugin
	 */
	p.init = function (){
		var api = this.slider.api;

		$(document).on('keydown.kbnav' + this.PId , function(event){
			var which = event.which;

			if ( which === 37 || which === 40 ) {
				api.previous(true);
			} else if ( which === 38 || which === 39 ) {
				api.next(true);
			}

		});

	};

	/**
	 * destroy the plugin
	 */
	p.destroy = function(){
		$(document).off('keydown.kbnav' + this.PId);
		this.slider.api.removeEventListener(MSSliderEvent.INIT, this.init, this);
	};

	// install plugin to master slider
	MasterSlider.registerPlugin( KeyboardNav );

})(jQuery, document, window);

/* ================== bin-debug/js/pro/plugins/MSStartOnAppear.js =================== */
/**
 * Start on appear plugin for Master Slider.
 * 
 * @description This plugin prevents slider automatically initialization and inits slider when it appears inside of the browser window.
 * @version  1.0.0
 * @author Averta
 * @package MasterSlider jQuery
 */

;(function($, document, window){
	var PId = 0,
		$window = $(window),
		$doc = $(document);

	// check if master slider is available
	if ( !window.MasterSlider ) {
		return;
	}

	var StartOnAppear = function ( slider ) {
		this.PId = PId++;
		this.slider = slider;
		this.$slider = slider.$element;
		
		if ( this.slider.options.startOnAppear ) {
			// hold on slider
			slider.holdOn();
			$doc.ready($.proxy(this.init, this));
		}
	};

	StartOnAppear.name = 'MSStartOnAppear';
	var p = StartOnAppear.prototype;

	/**
	 * initiate the plugin
	 */
	p.init = function (){
		var api = this.slider.api;
		$window.on('scroll.soa' + this.PId , $.proxy(this._onScroll, this)).trigger('scroll');
	};

	p._onScroll = function () {
		// check slider position
		var vpBottom = $window.scrollTop() + $window.height(),
			top = this.$slider.offset().top ;

		if ( top < vpBottom ) {
			$window.off('scroll.soa' + this.PId);
			this.slider.release();
		}
	};

	/**
	 * destroy the plugin
	 */
	p.destroy = function(){};

	// install plugin to master slider
	MasterSlider.registerPlugin( StartOnAppear );

})(jQuery, document, window);

/* ================== bin-debug/js/pro/plugins/MSFilters.js =================== */
/**
 * Master Slider Filters Plugin
 * This plugin adds CSS3 filters to the slides, like brightness, grayscale, sepia, ... It works in major browser and devices but in IE `opacity` only supported.
 * 
 * @package Master Slider jQuery
 * @author Averta
 * @version  1.0.0a
 */

;(function (document, window, jQuery){

	var filterUnits = {
		'hue-rotate' 	: 'deg',
		'blur' 			: 'px'
	}, initialValues = {
		'opacity' 		: 1,
		'contrast'		: 1,
		'brightness'	: 1,
		'saturate'		: 1,
		'hue-rotate'	: 0,
		'invert'		: 0,
		'sepia'			: 0,
		'blur'			: 0,
		'grayscale'		: 0
	}

	// check if master slider is available
	if ( !window.MasterSlider ) {
		return;
	}

	var Filters = function ( slider ) {
		this.slider = slider;

		if ( this.slider.options.filters ) {
			slider.api.addEventListener(MSSliderEvent.INIT, this.init, this);
		}
	};

	Filters.name = 'MSFilters';
	var p = Filters.prototype;

	/**
	 * initiate the plugin
	 */
	p.init = function (){
		var api = this.slider.api,
			view = api.view;

		this.filters 		= this.slider.options.filters;
		this.slideList 		= view.slideList;
		this.slidesCount 	= view.slidesCount;
		this.dimension 		= view[view.__dimension];
		this.target 		= this.slider.options.filterTarget === 'slide' ? '$element' : '$bg_img';
		this.filterName 	= $.browser.webkit ? 'WebkitFilter' : 'filter';

		// override controller update callback
		var superFun = view.controller.__renderHook.fun,
			superRef = view.controller.__renderHook.ref;
		view.controller.renderCallback( function (controller, value) {
			superFun.call(superRef, controller, value);
			this.applyEffect(value);
		} , this);
		this.applyEffect(view.controller.value);

	};

	/**
	 * Apply css effect to slides based on slide position.
	 * @param  {Number} value Current position of slider controller
	 */
	p.applyEffect = function (value) { 
		var factor, slide;

		for( var i = 0; i < this.slidesCount; ++i ) {
			slide = this.slideList[i];
			factor = Math.min(1 , Math.abs(value - slide.position) / this.dimension);
			
			if ( slide[this.target] ) {
				if ( !$.browser.msie ) {
					slide[this.target][0].style[this.filterName] = this.generateStyle(factor);
				} else if ( this.filters.opacity != null ) {
					slide[this.target].opacity( 1 - this.filters.opacity * factor);
				}
			}		
		}
	};

	/**
	 * Generate filter style based on slide distance factor
	 * @param  {Number} factor 
	 * @return {String} CSS style
	 */
	p.generateStyle = function (factor) {
		var style = '',
			unit;

		for ( var filter in this.filters ) {
			unit = filterUnits[filter] || '';
			style += filter + '(' + ( initialValues[filter] + (this.filters[filter] - initialValues[filter]) * factor) + ') ';			
		}

		return style;
	};

	/**
	 * destroy the plugin
	 */
	p.destroy = function(){
		this.slider.api.removeEventListener(MSSliderEvent.INIT, this.init, this);
	};

	// install plugin to master slider
	MasterSlider.registerPlugin( Filters );


})(document, window, jQuery);

/* ================== bin-debug/js/pro/plugins/MSScrollToAction.js =================== */
/**
 * Master Slider Scroll To Action Plugin.
 * 
 * @description This plugins adds page scrolling actions to the layer actions list.
 * @version  1.0.0
 * @author Averta
 * @package MasterSlider jQuery
 */

;(function($, document, window){

	// check if master slider is available
	if ( !window.MasterSlider ) {
		return;
	}

	var ScrollToAction = function ( slider ) {
		this.slider = slider;
		slider.api.addEventListener(MSSliderEvent.INIT, this.init, this);
	};

	ScrollToAction.name = 'MSScrollToAction';
	var p = ScrollToAction.prototype;

	/**
	 * initiate the plugin
	 */
	p.init = function (){
		var api = this.slider.api;
		
		// define actions
		api.scrollToEnd = _scrollToEnd;
		api.scrollTo = _scrollTo;
	};

	/**
	 * destroy the plugin
	 */
	p.destroy = function(){};

	/**
	 * Scroll window to the target element in page
	 * @param {Number} duration animation duration (seconds)
	 */
	var _scrollTo = function ( target, duration ) {
		var sliderEle = this.slider.$element,
			target = $(target).eq(0);

		if ( target.length === 0 ) {
			return;
		}
		console.log(target.offset().top, duration )

		if( duration == null ) {
			duration = 1.4;
		}

		$('html, body').animate({
			scrollTop: target.offset().top
		}, duration * 1000, 'easeInOutQuad');
	};

	/**
	 * Scroll window to the bottom of slider
	 * @param {Number} duration animation duration (seconds)
	 */
	var _scrollToEnd = function ( duration ) {
		var sliderEle = this.slider.$element;

		if( duration == null ) {
			duration = 1.4;
		}

		$('html, body').animate({
			scrollTop: sliderEle.offset().top + sliderEle.outerHeight(false)
		}, duration * 1000, 'easeInOutQuad');
	}

	// install plugin to master slider
	MasterSlider.registerPlugin( ScrollToAction );

})(jQuery, document, window);
// Affix nav

$('nav').affix({
  offset: {
    top: $('header').height()
  }
});

$(function () {
    $('a[href="#search"], button.search').on('click', function(event) {
        event.preventDefault();
        $('#search').addClass('open');
        $('#search > form > input[type="search"]').focus();
    });
    
    $('#search, #search button.close').on('click keyup', function(event) {
        if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
            $(this).removeClass('open');
        }
    });
    $('#search-close-icon').on('click', function(event) {
        $('#search').removeClass('open');
    });
});
var slider = new MasterSlider();
slider.setup('masterslider' , {
        width:1400,    // slider standard width
        height:500,   // slider standard height
        space:0,
        layout:'fullwidth',
        autoplay:true,
        loop:true
        // more slider options goes here...
        // check slider options section in documentation for more options.
    });
// adds Arrows navigation control to the slider.
slider.control('arrows');



var slider1 = new MasterSlider();
slider1.control('arrows'); 
slider1.control('slideinfo',{insertTo:"#partial-view-1" , autohide:false, align:'bottom', size:60});
slider1.control('circletimer' , {color:"#FFFFFF" , stroke:9});

slider1.setup('multi-slide-1' , {
  width:380,
  height:210,
  space:10,
  loop:true,
  view:'fadeWave',
  layout:'partialview'
});

var slider2 = new MasterSlider();
slider2.control('arrows'); 
slider2.control('slideinfo',{insertTo:"#partial-view-2" , autohide:false, align:'bottom', size:60});
slider2.control('circletimer' , {color:"#FFFFFF" , stroke:9});

slider2.setup('multi-slide-2' , {
  width:278,
  height:154,
  space:10,
  loop:true,
  view:'fadeWave',
  layout:'partialview'
});
