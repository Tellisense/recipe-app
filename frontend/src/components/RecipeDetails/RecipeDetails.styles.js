import styled from "styled-components"

export const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`

export const Instructions = styled.p`
  white-space: pre-line;
  line-height: 1.6;
  margin-bottom: 20px;
`

export const IngredientList = styled.ul`
  list-style: none;
  padding: 0;
`

export const IngredientItem = styled.li`
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`
