/*
 * The /resume page embeds this PDF in an iframe and offers it for download.
 *
 * The file is served from public/, so it is same-origin: the browser renders
 * it with its own PDF viewer and the download link saves it directly, with no
 * third-party viewer and no sharing settings that can silently break it.
 */
export const resumeConfig = {
  url: '/Resume.pdf',
  fileName: 'doyelshree-bhui-resume.pdf',
};
