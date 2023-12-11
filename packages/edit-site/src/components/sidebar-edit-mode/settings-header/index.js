/**
 * WordPress dependencies
 */
import { privateApis as componentsPrivateApis } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import { SIDEBAR_BLOCK, SIDEBAR_TEMPLATE } from '../constants';
import { store as editSiteStore } from '../../../store';
import { POST_TYPE_LABELS, TEMPLATE_POST_TYPE } from '../../../utils/constants';
import { unlock } from '../../../lock-unlock';

const { Tabs } = unlock( componentsPrivateApis );

const SettingsHeader = () => {
	const { isEditingPage, entityType } = useSelect( ( select ) => {
		const { getEditedPostType, isPage } = select( editSiteStore );
		const { getRenderingMode } = select( editorStore );

		return {
			isEditingPage: isPage() && getRenderingMode() !== 'template-only',
			entityType: getEditedPostType(),
		};
	} );

	const entityLabel =
		POST_TYPE_LABELS[ entityType ] ||
		POST_TYPE_LABELS[ TEMPLATE_POST_TYPE ];

	return (
		<Tabs.TabList>
			<Tabs.Tab tabId={ SIDEBAR_TEMPLATE }>
				{ isEditingPage ? __( 'Page' ) : entityLabel }
			</Tabs.Tab>
			<Tabs.Tab tabId={ SIDEBAR_BLOCK }>{ __( 'Block' ) }</Tabs.Tab>
		</Tabs.TabList>
	);
};

export default SettingsHeader;
