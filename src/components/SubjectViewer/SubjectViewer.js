import { useEffect, useState } from 'react'
import { Box, Button, CheckBox, Image, Text } from 'grommet'
import {
  FormNext as RightIcon,
  FormPrevious as LeftIcon,
  Hide as SensitiveContentIcon,
  Image as ImageIcon
} from 'grommet-icons'
import styled from 'styled-components'
import { ZooniverseLogo } from '@zooniverse/react-components'

import { DEFAULT_SUBJECT_VIEWER_WIDTH, DEFAULT_SUBJECT_VIEWER_HEIGHT } from '@src/config.js'
import strings from '@src/strings.json'
import checkForSensitiveContent from '@src/helpers/checkForSensitiveContent.js'
import getSubjectTitle from '@src/helpers/getSubjectTitle.js'

const FILMSTRIP_IMAGE_SIZE = 44
const MIN_IMAGES_TO_SHOW_FILMSTRIP = 2
const GOLD_COLOUR = '#F0B200'

const MainImage = styled(Image)`
  ${props => props.blur
    ? 'filter: blur(8px);'
    : ''
  }
`

const ImageContainer = styled(Box)`
  position: relative;
`

// Subject Details appear "on top" of the Subject image.
// ImageContainer needs to have position: relative to anchor SubjectDetails's position: absolute.
const SubjectDetails = styled(Box)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  max-width: 100%;
  background: rgb(128,128,128,0.5);
  background: linear-gradient(0deg, rgba(128,128,128,1) 0%, rgba(0,0,0,0) 100%);
`

const StyledButton = styled(Button)`
  border-radius: 0.5em;
  flex: 0 0 auto;
  padding: 7px;
  width: 200px;
`

const TextWithShadow = styled(Text)`
  flex: 1 1 auto;
  text-shadow: 0px 0px 2px #808080;
`

const ImageWithBorder = styled(Image)`
  border: 3px solid ${props => props.color}
`

const SensitiveContentBox = styled(Box)`
  position: relative;
  top: -${props => props.height};
  margin-bottom: -${props => props.height};
  background: rgba(128, 128, 128, 0.5);
`

const SensitiveContentCheckboxBox = styled(Box)`
  height: 2em;
  position: relative;
  top: -2em;
  margin-bottom: -2em;
`

export default function SubjectViewer ({
  openWorkflowSelection = () => {},
  project = undefined,
  setShowSensitive = () => {},
  showSensitive,
  subject = undefined,
}) {
  const subjectData = subject  // Look a lot of the other code I'm copy-pasting uses 'subjectData' so it's easier to rename the variable
  const subjectId = subject?.id
  const [ index, setIndex ] = useState(0)
  const viewerWidth = DEFAULT_SUBJECT_VIEWER_WIDTH
  const viewerHeight = DEFAULT_SUBJECT_VIEWER_HEIGHT

  let title = ''
  if (subjectId) {
    title = getSubjectTitle(subject, project?.title_field)
            || strings.pages.subject_page.title.replace(/{subject_id}/g, subjectId)
  } else {
    title = strings.pages.subject_page.no_subject  // If there's no subject ID, then there's no subject.
  }

  useEffect(function onTargetChange_resetData () {
    setIndex(0)
  }, [subject])

  function goPrevIndex () {
    setIndex(Math.max(index - 1, 0))
  }

  function goNextIndex () {
    setIndex(Math.min(index + 1, subjectData?.locations?.length - 1 || 0))
  }
  
  let imgSrc, filmstripSrcs = []

  if (subjectData) {
    // TODO: improve URL extraction
    imgSrc = subjectData.locations?.[index]?.['image/jpeg']
             || subjectData.locations?.[index]?.['image/png']

    filmstripSrcs = subjectData.locations.map(src => {
      const filmstripSrc = src['image/jpeg'] || src['image/png']
      return `https://thumbnails.zooniverse.org/${FILMSTRIP_IMAGE_SIZE}x${FILMSTRIP_IMAGE_SIZE}/${filmstripSrc?.replace(/^https?:\/\//ig, '')}`
    })
  }

  const hasSensitiveContent = checkForSensitiveContent(subjectData, project)
  const hideContent = (!showSensitive && hasSensitiveContent)

  // Some projects only have one Workflow, so clicking on the "Classify Subject"
  // link will immediately open that Subject on that Workflow. Other projects
  // have more than one workflow, so we need to open the workflow selection
  // dialog.
  const useWorkflowSelection = project?.classify_url?.includes('{workflow_id}')
  const classifySubjectUrl = (useWorkflowSelection)
    ? undefined
    : project?.classify_url?.replace(/{subject_id}/g, subject?.id)

  return (
    <Box
      className='subject-viewer'
    >
      <ImageContainer
        background='light-1'
        border={true}
        width={`${viewerWidth}px`}
        height={`${viewerHeight}px`}
        align={imgSrc ? undefined : 'center'} 
        justify={imgSrc ? undefined : 'center'}
        overflow='hidden' 
      >
        {imgSrc ? (
          <MainImage
            alt={strings.components.subject_viewer.image.replace(/{index}/g, index).replace(/{subject_id}/g, subjectId)}
            blur={hideContent}
            fit={'contain'}
            src={imgSrc}
          />
        ) : (  /* Placeholder when there's no image to load, or Subject is in process of loading */
          <ImageIcon
            a11yTitle={strings.components.subject_viewer.placeholder}
            size='large'
          />
        )}
        {subject && !hideContent && (
          <SubjectDetails
            align='center'
            cssGap={true}
            direction='row'
            gap='small'
            pad='small'
          >
            <TextWithShadow
              color='white'
              size='18px'
              weight='bold'
            >
              {title}
            </TextWithShadow>
            <StyledButton
              color='#005D69'
              className='classify-button'
              icon={<ZooniverseLogo id='classifyButton-zooniverseLogo' />}
              gap={'6px'}
              href={classifySubjectUrl}
              primary
              label={strings.components.subject_actions.classify_subject}
              onClick={useWorkflowSelection ? openWorkflowSelection : undefined}
            />
          </SubjectDetails>
        )}
      </ImageContainer>
      {(hideContent)
        ? <SensitiveContentBox
            align='center'
            pad='small'
            justify='center'
            width={`${viewerWidth}px`}
            height={`${viewerHeight}px`}
          >
            <SensitiveContentIcon
              color='white'
              size='xlarge'
            />
            <Text
              color='white'
              size='medium'
              textAlign='center'
            >
              {strings.components.subject_viewer.may_contain_sensitive_content}
            </Text>
          </SensitiveContentBox>
        : null
      }
      {(hasSensitiveContent && !showSensitive)
        ? <SensitiveContentCheckboxBox
            align='end'
            justify='center'
            pad={{ horizontal: 'small' }}
          >
            <CheckBox
              checked={showSensitive}
              onChange={e => setShowSensitive(!!e?.target?.checked)}
              label={
                <TextWithShadow
                  color='white'
                >
                  {strings.components.subject_viewer.show_sensitive_images}
                </TextWithShadow>
              }
              reverse={true}
            />
          </SensitiveContentCheckboxBox>
        : null
      }
      {(filmstripSrcs.length >= MIN_IMAGES_TO_SHOW_FILMSTRIP) && (
        <Box
          direction='row'
          justify='center'
        >
          <Button
            a11yTitle={strings.components.subject_viewer.prev_item}
            icon={<LeftIcon />}
            onClick={goPrevIndex}
          />
          {filmstripSrcs.map((filmstripSrc, _index) => {
            const isSelected = _index === index
            return (
              <Button
                key={`subject-viewer-filmstrip-${_index}`}
                margin={{ horizontal: 'xxsmall', vertical: 'small' }}
              >
                <ImageWithBorder
                  /* TODO alt={strings.components.subject_viewer.image.replace(/{index}/g, _index).replace(/{subject_id}/g, subjectId)}*/
                  color={(isSelected) ? GOLD_COLOUR : 'transparent'}
                  fit='cover'
                  src={filmstripSrc}
                  height={FILMSTRIP_IMAGE_SIZE}
                  width={FILMSTRIP_IMAGE_SIZE}
                  onClick={() => { setIndex(_index) }}
                />
              </Button>
            )
          })}
          <Button
            a11yTitle={strings.components.subject_viewer.next_item}
            icon={<RightIcon />}
            onClick={goNextIndex}
          />
        </Box>
      )}
    </Box>
  )
}
