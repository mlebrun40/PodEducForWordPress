(function () {
	'use strict';

	var el      = wp.element.createElement;
	var useState = wp.element.useState;
	var Fragment = wp.element.Fragment;
	var useBlockProps     = wp.blockEditor.useBlockProps;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var RichText          = wp.blockEditor.RichText;
	var PanelBody    = wp.components.PanelBody;
	var TextControl  = wp.components.TextControl;
	var SelectControl = wp.components.SelectControl;
	var ToggleControl = wp.components.ToggleControl;
	var Button       = wp.components.Button;
	var Notice       = wp.components.Notice;
	var Placeholder  = wp.components.Placeholder;
	var registerBlockType = wp.blocks.registerBlockType;

	/* ── Helpers ─────────────────────────────────────────────────────────────── */

	function extractVideoId( url ) {
		try {
			var parsed = new URL( url );
			if ( ! parsed.hostname.includes( 'podeduc' ) ) return null;
			var m = parsed.pathname.match( /\/video\/([^/]+)\/?/ );
			return m ? m[1] : null;
		} catch ( e ) { return null; }
	}

	function buildSrc( videoId ) {
		return 'https://podeduc.apps.education.fr/video/' + videoId + '/?is_iframe=true';
	}

	function ratioPadding( ratio ) {
		if ( ratio === '4/3' )  return '75%';
		if ( ratio === '1/1' )  return '100%';
		return '56.25%'; /* 16/9 */
	}

	/* ── Edit ────────────────────────────────────────────────────────────────── */

	function Edit( props ) {
		var attributes   = props.attributes;
		var setAttributes = props.setAttributes;
		var videoId    = attributes.videoId;
		var videoUrl   = attributes.videoUrl;
		var title      = attributes.title;
		var aspectRatio = attributes.aspectRatio;
		var showCaption = attributes.showCaption;
		var caption     = attributes.caption;

		var blockProps = useBlockProps();
		var inputState = useState( videoUrl || '' );
		var inputUrl   = inputState[0];
		var setInputUrl = inputState[1];
		var errorState = useState( '' );
		var error      = errorState[0];
		var setError   = errorState[1];

		var src = videoId ? buildSrc( videoId ) : null;

		function handleEmbed() {
			var id = extractVideoId( inputUrl );
			if ( ! id ) {
				setError( "URL invalide. Exemple : https://podeduc.apps.education.fr/video/12345-mon-titre/" );
				return;
			}
			setError( '' );
			setAttributes( { videoId: id, videoUrl: inputUrl } );
		}

		var ratioOptions = [
			{ label: '16:9', value: '16/9' },
			{ label: '4:3',  value: '4/3'  },
			{ label: '1:1',  value: '1/1'  },
		];

		return el( Fragment, null,
			/* Panneau latéral */
			el( InspectorControls, null,
				el( PanelBody, { title: 'Vidéo PodEduc', initialOpen: true },
					el( TextControl, {
						label: 'Titre (accessibilité)',
						value: title,
						onChange: function( v ) { setAttributes( { title: v } ); },
					} ),
					el( SelectControl, {
						label: 'Format',
						value: aspectRatio,
						options: ratioOptions,
						onChange: function( v ) { setAttributes( { aspectRatio: v } ); },
					} ),
					el( ToggleControl, {
						label: 'Afficher une légende',
						checked: showCaption,
						onChange: function( v ) { setAttributes( { showCaption: v } ); },
					} )
				)
			),

			/* Bloc */
			el( 'div', blockProps,
				! src
					/* Placeholder : saisie URL */
					? el( Placeholder, { icon: 'video-alt3', label: 'Vidéo PodEduc',
							instructions: "Collez l'URL d'une vidéo PodEduc." },
						el( 'div', { style: { display: 'flex', gap: '8px', width: '100%', alignItems: 'flex-end' } },
							el( TextControl, {
								placeholder: 'https://podeduc.apps.education.fr/video/…',
								value: inputUrl,
								onChange: setInputUrl,
								onKeyDown: function( e ) { if ( e.key === 'Enter' ) handleEmbed(); },
								style: { flex: '1' },
							} ),
							el( Button, { variant: 'primary', onClick: handleEmbed }, 'Intégrer' )
						),
						error && el( Notice, { status: 'error', isDismissible: false }, error )
					)
					/* Prévisualisation dans l'éditeur */
					: el( 'figure', { style: { margin: '0', padding: '0' } },
						el( 'div', { style: { position: 'relative', paddingBottom: ratioPadding( aspectRatio ), height: '0', overflow: 'hidden' } },
							el( 'iframe', {
								src: src, title: title,
								allowFullScreen: true,
								allow: 'autoplay; encrypted-media; picture-in-picture',
								loading: 'lazy',
								style: { position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', border: '0', pointerEvents: 'none' },
							} )
						),
						showCaption && el( RichText, {
							tagName: 'figcaption',
							value: caption,
							onChange: function( v ) { setAttributes( { caption: v } ); },
							placeholder: 'Légende…',
							style: { textAlign: 'center', fontStyle: 'italic', marginTop: '0.5em' },
						} ),
						el( 'div', { style: { textAlign: 'right', marginTop: '4px' } },
							el( Button, { variant: 'secondary', isSmall: true,
								onClick: function() { setAttributes( { videoId: '', videoUrl: '' } ); setInputUrl( '' ); }
							}, 'Remplacer' )
						)
					)
			)
		);
	}

	/* ── Save : null = bloc dynamique (render.php côté serveur) ─────────────── */

	function Save() {
		return null;
	}

	/* ── Enregistrement ──────────────────────────────────────────────────────── */

	registerBlockType( 'podedu/video-block', {
		edit: Edit,
		save: Save,
	} );

}());
