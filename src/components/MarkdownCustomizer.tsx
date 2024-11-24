import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { useUserContext } from "./UserContext";
import { fetchModifiedMarkdown } from "../utils/aiApiConnector";
import { loadMarkdownFile, processWikiLinks } from "../utils/markdownLoader";
import ToggleButton from "./ToggleButton";

export default function MarkdownCustomizer() {
  const { '*': path } = useParams();
  const navigate = useNavigate();
  const { userDescription } = useUserContext();
  const [content, setContent] = useState('');
  const [modifiedContent, setModifiedContent] = useState('');
  const [showModified, setShowModified] = useState(true);
  const { prompt } = useUserContext();

  useEffect(() => {
    loadMarkdownFile(path || 'Home')
      .then(text => {
        const processedText = processWikiLinks(text);
        setContent(processedText);
      })
      .catch(() => {
        navigate('/404');
      });
  }, [path, navigate]);

  useEffect(() => {
    if (content && prompt) {
      setModifiedContent('Generating personalized version...');
      fetchModifiedMarkdown(content, prompt).then(response => {
        setModifiedContent(processWikiLinks(response.text));
        setShowModified(true);
      }).catch(error => {
        console.error('Error fetching modified markdown:', error);
        setModifiedContent('(error)');
      });
    } else if (content) {
      setModifiedContent('');
    }
  }, [content, prompt]);

  const toggleContent = () => {
    if (!userDescription) {
      // TODO: Show a modal to ask the user to personalize the site first
      return;
    }
    setShowModified(prev => !prev);
  };

  // TODO Fix - if the user removes their description, the toggle button resets but the content is still modified.

  return (
    <div>
      <MarkdownRenderer
        markdown={showModified ? (modifiedContent || content) : content}
        isModified={showModified && !!modifiedContent}
      />
      <ToggleButton showModified={!!userDescription && showModified} toggleContent={toggleContent} optionOne="Original" optionTwo="Personalized" />
    </div>
  );
}