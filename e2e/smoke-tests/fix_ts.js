const fs = require('fs');
const path = require('path');

const basePath = 'C:/Users/Dhanush/Desktop/Digibot/digibot - Copy - Copy - Copy/e2e/smoke-tests/specs';

const files = [
    "files_delete_comprehensive.spec.ts",
    "files_name_patch_comprehensive.spec.ts",
    "files_upload_query_comprehensive.spec.ts",
    "integrations_integrationId_files_fileId_import_teamId_post_comprehensive.spec.ts",
    "super_admin_companies_companyid_profile_avatar_put_comprehensive.spec.ts",
    "super_admin_companies_companyid_profile_patch_comprehensive.spec.ts",
    "super_admin_companies_companyid_usage_last_month_get_comprehensive.spec.ts",
    "super_admin_users_userid_profile_avatar_put_comprehensive.spec.ts",
    "super_admin_users_userid_profile_patch_comprehensive.spec.ts",
    "super_admin_users_userid_role_get_comprehensive.spec.ts",
    "super_admin_users_userid_usage_last_month_get_comprehensive.spec.ts",
    "teams_chats_chatId_messages_get_comprehensive.spec.ts",
    "teams_chats_chatId_messages_post_comprehensive.spec.ts",
    "teams_chats_chatId_patch_comprehensive.spec.ts",
    "teams_chats_delete_comprehensive.spec.ts",
    "teams_chats_get_comprehensive.spec.ts",
    "teams_chats_post_comprehensive.spec.ts"
];

files.forEach(file => {
    const fullPath = path.join(basePath, file);
    if (!fs.existsSync(fullPath)) return;
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace assignments with String(...) wrapper. 
    // We only want to wrap assignments that aren't already wrapped.
    const patterns = [
        'testCompanyId',
        'testTeamId',
        'testFolderId',
        'testFileId',
        'testUserId',
        'testChatId',
        'testIntegrationId'
    ];
    
    patterns.forEach(p => {
        // e.g. testCompanyId = testData.companies.company1.id;
        // Don't wrap if it's already String(
        const regex = new RegExp(`(${p}\\s*=\\s*)(?!String\\()([^;\\n]+)(;)`, 'g');
        content = content.replace(regex, '$1String($2)$3');
    });

    fs.writeFileSync(fullPath, content);
});

console.log("Fixed TS errors");
