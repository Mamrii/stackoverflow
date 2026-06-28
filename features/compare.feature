Feature: Comparaison API vs UI StackOverflow

  Scenario: Vérifier que la première question API correspond à celle de l'IHM

    Given A_API_ j'appelle le endpoint "/2.3/questions"
    And A_API_ avec les paramètres suivants
      | order | desc          |
      | sort  | creation      |
      | site  | stackoverflow |
    And C_API_ la réponse HTTP est "200"
    And A_API_ je récupère le premier titre de la réponse
    When A_IHM_ j'ouvre la page des dernières questions StackOverflow
    And A_IHM_ je récupère le premier titre affiché
    Then C_IHM_ les deux titres doivent être identiques