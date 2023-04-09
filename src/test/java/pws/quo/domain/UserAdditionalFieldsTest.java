package pws.quo.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import pws.quo.web.rest.TestUtil;

class UserAdditionalFieldsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserAdditionalFields.class);
        UserAdditionalFields userAdditionalFields1 = new UserAdditionalFields();
        userAdditionalFields1.setId(1L);
        UserAdditionalFields userAdditionalFields2 = new UserAdditionalFields();
        userAdditionalFields2.setId(userAdditionalFields1.getId());
        assertThat(userAdditionalFields1).isEqualTo(userAdditionalFields2);
        userAdditionalFields2.setId(2L);
        assertThat(userAdditionalFields1).isNotEqualTo(userAdditionalFields2);
        userAdditionalFields1.setId(null);
        assertThat(userAdditionalFields1).isNotEqualTo(userAdditionalFields2);
    }
}
